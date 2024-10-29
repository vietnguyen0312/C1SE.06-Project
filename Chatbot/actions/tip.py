import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from dotenv import load_dotenv
import os
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, ActionExecutionRejected
from getDatabase.get_room import *
load_dotenv()
BASE_URL = os.getenv("BASE_URL")
api_key = os.getenv("API_GEOCODING")
from prettytable import PrettyTable

class ActionWeatherQuery(Action):

    def name(self) -> str:
        return "action_weather_query"

    def analyze_weather(self, temperature, precipitation, cloud_cover, humidity):
        description = ""
        
        # Phân tích lượng mưa
        if precipitation > 10:
            description += "Mưa to. "
        elif precipitation > 1:
            description += "Mưa nhỏ. "
        else:
            description += "Không có mưa. "
        
        # Phân tích độ che phủ mây
        if cloud_cover == 100:
            description += ""
        elif cloud_cover > 80:
            description += "Rất nhiều mây. "
        elif cloud_cover > 50:
            description += "Nhiều mây. "
        elif cloud_cover > 30:
            description += "Ít mây. "
        else:
            description += "Trời quang. "
        
        # Phân tích nhiệt độ
        if temperature > 35:
            description += "Nắng gắt. "
        elif 25 <= temperature <= 35:
            if humidity < 50:
                description += "Nắng hanh. "
            else:
                description += "Nắng. "
        elif 20 <= temperature < 25:
            description += "Thời tiết mát mẻ. "
        else:
            description += "Thời tiết lạnh. "
        
        return description.strip()

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        combined_data = ""
        try:
            address = requests.get(BASE_URL + "faq/ask_about_location").json()['result']['description']  # Chuyển đổi phản hồi thành JSON
            url = f"https://api.opencagedata.com/geocode/v1/json?q={address}&key={api_key}"
            
            # Lấy tọa độ từ API geocoding
            geo_response = requests.get(url).json()
            latitude = geo_response['results'][0]['geometry']['lat']
            longitude = geo_response['results'][0]['geometry']['lng']

            # Lấy dữ liệu thời tiết
            response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true")
            weather_data = response.json()

            temperature = weather_data['current_weather']['temperature']
            windspeed = weather_data['current_weather']['windspeed']

            humidity = weather_data['current_weather'].get('humidity', 0)  # Độ ẩm
           
            weather_description = self.analyze_weather(temperature, weather_data['current_weather'].get('precipitation', 0), weather_data['current_weather'].get('cloudcover', 0), humidity)  # Phân tích thời tiết
            print("weather_description", weather_description)
            print(" weather_data['current_weather'].get('cloudcover', 0)",  weather_data['current_weather'].get('cloudcover', 0))
            print("weather_data['current_weather'].get('precipitation', 0)", weather_data['current_weather'].get('precipitation', 0))
            print("humidity", humidity)
            print("weather_data", weather_data)
            # Cập nhật combined_data để bao gồm mô tả thời tiết hiện tại
            combined_data = f"Nhiệt độ hiện tại là {temperature}°C, gió với tốc độ {windspeed} km/h. {weather_description}.\n"
            weather_data_daily = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true")
            weather_data_daily = weather_data_daily.json()  
            
            if 'daily' in weather_data_daily:

                # Tạo bảng
                table = PrettyTable()
                table.field_names = ["Ngày", "Nhiệt độ Cao nhất (°C)", "Nhiệt độ Thấp nhất (°C)", "Lượng mưa (mm)", "Mô tả"]

                # Thêm dữ liệu vào bảng từ weather_data_daily
                for day in weather_data_daily['daily']['time'][:3]:  # Lấy 3 ngày tới
                    max_temp = weather_data_daily['daily']['temperature_2m_max'][weather_data_daily['daily']['time'].index(day)]
                    min_temp = weather_data_daily['daily']['temperature_2m_min'][weather_data_daily['daily']['time'].index(day)]
                    precipitation = weather_data_daily['daily']['precipitation_sum'][weather_data_daily['daily']['time'].index(day)]
                    
                    # Phân tích mô tả thời tiết cho từng ngày
                    description = self.analyze_weather(max_temp, precipitation, 100, humidity)

                    table.add_row([day, max_temp, min_temp, precipitation, description])
                    html_table = table.get_html_string()

                combined_data += f"<div>{html_table}</div>"
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_error")
            return [ActionExecutionRejected(self.name())]

        return [SlotSet("combined_data", combined_data)]
