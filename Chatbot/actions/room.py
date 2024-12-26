

import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, ActionExecutionRejected  # type: ignore
from dotenv import load_dotenv
import os

from getDatabase.get_room import *

load_dotenv()

BASE_URL = os.getenv("BASE_URL")
room_keywords = {
    "đơn": "Normal Room",
    "normal": "Normal Room",
    "đôi": "Family Room",
    "couple": "Couple Room",
    "family": "Family Room",
    "luxurious": "Luxurious Room",
    "president": "President Room",
    "vip": "President Room"
}

room_type_id_mapping  = {
    "Normal Room": "14dbb13e-d61d-4efc-8b5a-2bde1e6b66a7",
    "Family Room": "876737f5-7573-4ef9-baab-4d422c1cec3f",
    "Couple Room": "0163b8ef-61e1-4877-b018-608b48405e5f",
    "Luxurious Room": "ec7a9e57-db90-4e63-bd23-71c5a504413f",
    "President Room": "3f56c5fe-7071-4d7b-9090-69e2cfca02eb"
}

class ActionListRoomTypes(Action):

    def name(self) -> Text:
        return "action_list_room_types"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        result = get_room_type()
        if result:
            room_types = [room["name"] for room in result]
            response = "Các loại phòng hiện có là:<br>" + "<br>".join(room_types) + "."
        else:
            response = "Hiện không có thông tin về các loại phòng."

       
        dispatcher.utter_message(text=response)

        return []
    
class ActionGetRoomPrices(Action):

    def name(self) -> Text:
        return "action_get_room_prices"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       
        room_types = get_room_type()

        if room_types:
           
            room_prices = {room["name"]: room["price"] for room in room_types}

       
            user_message = tracker.latest_message.get('text', '').lower()
            print(user_message)
            specific_room = next((room for keyword, room in room_keywords.items() if keyword in user_message), None)

        
            if specific_room and specific_room in room_prices:
                response = f"Giá của phòng <strong>{specific_room}</strong> là <strong>{room_prices[specific_room]:,} VNĐ</strong>."
            else:
                response = "Giá của tất cả các loại phòng là:<br>"
                response += "<ul>"  
                for room_name, price in room_prices.items():
                    response += f"<li>{room_name}: {price:,} VNĐ</li>"  
                response += "</ul>"  
        else:
            response = "Hiện không có thông tin về giá của các loại phòng."

       
        dispatcher.utter_message(text=response)

        return []


class ActionGetRoomDetails(Action):

    def name(self) -> Text:
        return "action_get_room_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       
        room_details = get_room_type() 

        if room_details:
            room_info = {room["name"]: room["detail"] for room in room_details}

            user_message = tracker.latest_message.get('text', '').lower()
            print(user_message)
            specific_room = None

            for keyword, room in room_keywords.items():
                if keyword in user_message:
                    specific_room = room
                    break

         
            if specific_room and specific_room in room_info:
                response = f"Chi tiết của phòng {specific_room}: {room_info[specific_room]}"
            else:

                response = "<h5>Chi tiết của tất cả các loại phòng là:</h5>\n<ol>"
                for room_name, detail in room_info.items():
                    response += f"<li> <strong>{room_name}</strong> : {detail}</li>"
                response += "</ol>"
        else:
            response = "Hiện không có thông tin về chi tiết các loại phòng."


        dispatcher.utter_message(text=response)

        return []

class ActionGetRoomCount(Action):
    def name(self) -> Text:
        return "action_get_room_count"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        room_count = len(get_room())
        
        dispatcher.utter_message(text=f"Tổng số phòng hiện mà khách sạn có là: {room_count}")
        return []
    
    
class ActionGetEmptyRooms(Action):
    def name(self) -> Text:
        return "action_get_empty_rooms"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
      
        empty_rooms = get_empty_room()
        
       
        if "error" in empty_rooms:
            response = empty_rooms["error"]
        else:
            if empty_rooms:
                response = "Danh sách phòng trống:<br>"  
                response += "<ul>"  
                response += "".join([f"<li>Phòng số {room['roomNumber']} - Loại: {room['roomType']['name']}</li>" for room in empty_rooms])
                response += "</ul>"  
            else:
                response = "Hiện tại không có phòng nào trống."

        
        dispatcher.utter_message(text=response)
        
        return []
    
class ActionGetRoomsByCheckinAndRoomType(Action):

    def name(self) -> Text:
        return "action_get_rooms_by_checkin_and_roomtype"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Lấy các entity từ tracker
        raw_check_in_date = str(tracker.get_slot('check_in_date'))
        raw_room_keyword = str(tracker.get_slot('room_type'))

        # Debug thông tin đầu vào
        print(f"Check-in date: {raw_check_in_date}, Room type keyword: {raw_room_keyword}")

        # Xử lý ngày check-in
        check_in_date = convert_to_date(raw_check_in_date)
        print(check_in_date)
        if not check_in_date:
            dispatcher.utter_message(text="Ngày check-in không hợp lệ.")
            return []

        # Ánh xạ từ keyword phòng qua tên loại phòng
        room_type_name = room_keywords.get(raw_room_keyword.lower().strip())

        if not room_type_name:
            dispatcher.utter_message(text="Loại phòng không hợp lệ.")
            return []

        # Lấy room_type_id từ danh sách ánh xạ
        room_type_id = room_type_id_mapping.get(room_type_name)

        if not room_type_id:
            dispatcher.utter_message(text="ID loại phòng không hợp lệ.")
            return []

        # In ra check-in date và room_type để kiểm tra
        print(f"Check-in date: {check_in_date}, Room type: {room_type_name}, Room type ID: {room_type_id}")

        # Gọi hàm lấy phòng từ API
        rooms = get_rooms_by_checkin_and_roomtype(check_in_date, room_type_id)

        # Xử lý phản hồi từ API
        if "error" in rooms:
            response = rooms["error"]
        else:
            if rooms:
                response = f"Phòng trống cho ngày {check_in_date} và loại phòng {room_type_name} là:\n"
                for room in rooms:
                    room_number = room.get("roomNumber", "Không xác định")
                    response += f"- Phòng số: {room_number}\n"
            else:
                response = f"Không có phòng trống cho ngày {check_in_date} và loại phòng {room_type_name}."
        
        # Gửi phản hồi đến người dùng
        dispatcher.utter_message(text=response)

        return []
    
class ActionGetReturnPolicy(Action):
    def name(self) -> Text:
        return "action_get_return_policy"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        combined_data = ""
        intent = get_current_intent(tracker)
        print("intent: ", intent)
        try:
            # Gửi yêu cầu GET đến API
            response = requests.get(BASE_URL + "faq/"+intent)
            response.raise_for_status()  # Kiểm tra mã trạng thái HTTP
            data = response.json()
            description = data['result']['description']
            combined_data = f"{description}"
            print(combined_data)
            
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_goodbye")
            return [ActionExecutionRejected(self.name())]
    
        return [SlotSet("combined_data", combined_data)]
    
def get_current_intent(tracker):
    # Lấy tên intent hiện tại
    return tracker.latest_message['intent'].get('name')
