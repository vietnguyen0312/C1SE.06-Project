import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from dotenv import load_dotenv
import os
from rasa_sdk.events import SlotSet, ActionExecutionRejected
from prettytable import PrettyTable
from datetime import datetime
import re

load_dotenv()
BASE_URL = os.getenv("BASE_URL")
api_key = os.getenv("API_GEOCODING")
API_OPEN_METEO = os.getenv("API_OPEN_METEO")

def analyze_weather(temperature, precipitation, cloud_cover, humidity):
    description = ""
    
    if precipitation > 10:
        description += "Mưa to. "
    elif precipitation > 1:
        description += "Mưa nhỏ. "
    else:
        description += "Không có mưa. "
    
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
    
    if temperature > 35:
        description += "Nắng gắt. "
    elif 30 <= temperature <= 35:
        if humidity < 50:
            description += "Nắng hanh. "
        else:
            description += "Nắng. "
    elif 20 <= temperature < 30:
        description += "Thời tiết mát mẻ. "
    elif 10 <= temperature < 20 :
        description += "Thời tiết lạnh. "
    elif temperature < 10:
        description += "Thời tiết rét. "
    
    return description.strip()

def get_weather_data(address):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={address}&key={api_key}"
    geo_response = requests.get(url).json()
    latitude = geo_response['results'][0]['geometry']['lat']
    longitude = geo_response['results'][0]['geometry']['lng']

    response = requests.get(API_OPEN_METEO + f"forecast?latitude={latitude}&longitude={longitude}&current_weather=true")
    weather_data = response.json()
    
    return latitude, longitude, weather_data

class ActionWeatherQuery(Action):

    def name(self) -> str:
        return "action_weather_query"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        combined_data = ""
        try:
            address = requests.get(BASE_URL + "faq/address").json()['result']['description']  
            latitude, longitude, weather_data = get_weather_data(address)

            temperature = weather_data['current_weather']['temperature']
            windspeed = weather_data['current_weather']['windspeed']
            humidity = weather_data['current_weather'].get('humidity', 0)
           
            weather_description = analyze_weather(
                temperature,
                weather_data['current_weather'].get('precipitation', 0),
                weather_data['current_weather'].get('cloudcover', 0),
                humidity
            )
            
            combined_data = f"Nhiệt độ hiện tại là {temperature}°C, gió với tốc độ {windspeed} km/h. {weather_description}.\n"
            weather_data_daily = requests.get( API_OPEN_METEO + f"forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true")
            weather_data_daily = weather_data_daily.json()  
            
            if 'daily' in weather_data_daily:
                table = PrettyTable()
                table.field_names = ["Ngày", "Nhiệt độ Cao nhất (°C)", "Nhiệt độ Thấp nhất (°C)", "Lượng mưa (mm)", "Mô tả"]
    
                for day in weather_data_daily['daily']['time'][:3]:  
                    max_temp = weather_data_daily['daily']['temperature_2m_max'][weather_data_daily['daily']['time'].index(day)]
                    min_temp = weather_data_daily['daily']['temperature_2m_min'][weather_data_daily['daily']['time'].index(day)]
                    precipitation = weather_data_daily['daily']['precipitation_sum'][weather_data_daily['daily']['time'].index(day)]
                    
                    description = analyze_weather(max_temp, precipitation, weather_data['current_weather'].get('cloudcover', 0), humidity)
                    table.add_row([day, max_temp, min_temp, precipitation, description])
                
                html_table = table.get_html_string()
                combined_data += f"<div>{html_table}</div>"
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_error")
            return [ActionExecutionRejected(self.name())]

        return [SlotSet("combined_data", combined_data)]

class ActionWeatherQuerySpecificDay(Action):
    def name(self) -> str:
        return "action_weather_query_specific_day"

    def normalize_date_string(self, date_str):
        date_str = date_str.lower().strip()
        date_str = re.sub(r'(?i)ngày', '', date_str)
        date_str = re.sub(r'(?i)tháng', '', date_str)
        date_str = re.sub(r'[\s/.-]+', '-', date_str)
        
        if len(date_str.split('-')) == 2:  
            date_str += f"-{datetime.now().year}"  
        
        return date_str

    def get_weather_for_specific_day(self, latitude, longitude, specific_date):
        url = API_OPEN_METEO + f"forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&start_date={specific_date}&end_date={specific_date}"
        weather_data_daily = requests.get(url).json()
        
        if 'daily' in weather_data_daily:
            max_temp = weather_data_daily['daily']['temperature_2m_max'][0]
            min_temp = weather_data_daily['daily']['temperature_2m_min'][0]
            precipitation = weather_data_daily['daily']['precipitation_sum'][0]
            current_weather_response = requests.get(API_OPEN_METEO + f"forecast?latitude={latitude}&longitude={longitude}&current_weather=true").json()
            cloud_cover = current_weather_response['current_weather'].get('cloudcover', 0)
            humidity = current_weather_response['current_weather'].get('humidity', 0)

            description = analyze_weather(max_temp, precipitation, cloud_cover, humidity)
            return f"Ngày {specific_date}: Nhiệt độ cao nhất {max_temp}°C, thấp nhất {min_temp}°C, lượng mưa {precipitation} mm. {description}"
        else:
            return "Không có dữ liệu thời tiết cho ngày này."

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        combined_data = ""
        try:
            address = requests.get(BASE_URL + "faq/address").json()['result']['description']  
            print("Địa chỉ:", address)
            latitude, longitude, _ = get_weather_data(address)

            specific_date_str = tracker.latest_message['entities'][0]['value'] 
            SlotSet("specific_date", specific_date_str)
            print("Giá trị của slot specific_date:", specific_date_str)

            if specific_date_str:
                normalized_date_str = self.normalize_date_string(specific_date_str)
                print("Chuỗi ngày tháng đã chuẩn hóa:", normalized_date_str)

                specific_date = datetime.strptime(normalized_date_str, "%d-%m-%Y").date()
                combined_data = self.get_weather_for_specific_day(latitude, longitude, specific_date)
            else:
                dispatcher.utter_message(template="utter_ask_about_weather_for_specific_day_error")

        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_ask_about_weather_for_specific_day_error")
            return [ActionExecutionRejected(self.name())]
        except Exception as e:
            dispatcher.utter_message(template="utter_ask_about_weather_for_specific_day_error")
            return [ActionExecutionRejected(self.name())]

        return [SlotSet("combined_data", combined_data)]