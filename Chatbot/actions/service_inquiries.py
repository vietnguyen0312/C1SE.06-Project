import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from dotenv import load_dotenv
import os
from fuzzywuzzy import fuzz
from rasa_sdk.events import SlotSet, ActionExecutionRejected
from getDatabase.get_room import *
load_dotenv()
BASE_URL = os.getenv("BASE_URL")

location_mapping = {
    "Cáp treo": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "Chuyến Tàu Phiêu Lưu Trong Hầm Nhỏ": "7f6d9a43-1e57-45b2-9c42-f6391a58a5a2",
    "Công viên nước": "f47ac10b-58cc-4372-a567-0e02b2c3a934",
    "Cú Rơi Thế Kỉ": "b6c0a1e8-7a1f-4e8d-8d62-63e3a0dbba0b",
    "Đền Ngũ Hành": "d8e5f3b7-1234-5678-9abc-def012345678",
    "Đu quay cảm giác mạnh": "ab2b3c51-46de-438b-8c68-79d2c0077a25",
    "Đu Quay Dây Văng": "b1e1a2c3-45f6-47a5-9c0a-4b2e1a4e8d70",
    "Hoạt động Văn hóa du lịch các dân tộc Việt Nam": "f1d3e4f6-7890-abcdef-1234-567890abcdef",
    "Khách sạn": "b8a40e72-9c1a-4cb2-8f29-1c6f5460cb22",
    "Massage và Spa": "b5b5d06c-2293-4f31-8d84-15f6c4b6d2f0",
    "Miếu Bà": "b9a8c6c6-f1d3-4e8a-9d0b-e8a5d5e1c9d0",
    "Nhà Bia Mộ": "032ac027-1b46-48be-a397-46264b68b052",
    "Nhà Cổ": "b8a5d5e1-c9d0-4e8a-9d0b-e8a5c6c6f1d3",
    "Nhà Hàng Buffet": "ab2e5d56-32e1-48b0-84a2-c6a26d29cf70",
    "Tắm bùn": "b1b6a9e8-38d7-4b0f-96c4-bb05c1b5e701",
    "Tắm nước nóng": "b4b4d06b-1182-4d43-9d48-c0e0e3f2795e",
    "Tắm Trà Xanh": "c6b9d98d-24f0-43e2-b274-d7ed7d7085b0",
    "Tàu Lượn Siêu Tốc": "a6f5b2d8-5d9c-4a42-8bfa-c65d6a87f10c",
    "Tượng Phật": "e4d6f7b2-8c1a-4f5e-8b6c-6b5e4b6a9c8d",
    "Vườn hoa kiến trúc": "f7b2c4e9-8d6a-4e77-bc62-fd1d7a3b6c92",
    "Xe điện": "eab48ff9-1129-4f3e-899f-6a294e8a08c2",
    "Xe limousine": "c5d3e4f6-7890-abcdef-1234-567890abcdef",
    "Xe tuk-tuk": "b2c3d4e5-f678-90ab-cdef-1234567890ab",
    "Xem phim 4D": "a9e37e21-2d39-44f0-b7e2-01d5db4e1e4b",
    "Xích lô": "e1a81185-f02f-49e7-876b-45c151269053",
    "Xông hơi": "d3a2e9c5-48c3-4d0c-8e5a-3d38fd782b3e"
}


class ActionListServices(Action):

    def name(self) -> Text:
        return "action_list_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       
        url = BASE_URL + "serviceTypes"
        combined_data = ""
        try:
            
            response = requests.get(url)
            response.raise_for_status() 

            data = response.json()
            
            print("data: ", data)
            if "result" in data and isinstance(data["result"], list):
                services = data["result"]
                num_services = len(services)

                service_list = "<li>" + "</li><li>".join([service["name"] for service in services]) + "</li>"

                combined_data = f"Hiện tại có {num_services} loại dịch vụ: <ol>{service_list}</ol>."
            else:
                dispatcher.utter_message(template="utter_error")
        
        except requests.exceptions.RequestException as e:
            
            dispatcher.utter_message(template="utter_error")

        if(combined_data == ""):
            return [ActionExecutionRejected(self.name())]

        return [SlotSet("combined_data", combined_data)]
class ActionServiceEntity(Action):

    def name(self) -> Text:
        return "action_service_entity"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        service_name = tracker.latest_message['entities'][0]['value'] 
        print("service_name: ", service_name)
        # set_slot = SlotSet("service_name", service_name)
        # print("service_name: ", service_name)
        
        try:
            response = requests.get(BASE_URL + "serviceTypes")
            response.raise_for_status()
            services = response.json()["result"]
            best_match_id = ""
            best_match_score = 0

            for service in services:
                score = fuzz.ratio(service_name.lower(), service["name"].lower())
                if score > best_match_score:
                    best_match_score = score
                    best_match_id = service["id"]

            if best_match_id:
                detail_service_url = BASE_URL + f"services?page=1&size=6&serviceTypeId={best_match_id}&search="
                detail_response = requests.get(detail_service_url)
                detail_response.raise_for_status()
                detail_data = detail_response.json()
                service_details = detail_data["result"]["data"]
                service_names = [x["name"] for x in service_details]
                combined_data = ", ".join(service_names)
                return [SlotSet("combined_data", combined_data)]
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_error")
        
        return []
    
class ActionFoodServices(Action):

    def name(self) -> Text:
        return "action_food_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
    
class ActionPriceServices(Action):

    def name(self) -> Text:
        return "action_price_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        service_name = tracker.latest_message['entities'][0]['value'] 
        print("service_name: ", service_name)

        combined_data=""
        try:
            response = requests.get(BASE_URL + "services", params={"page": 1, "size": 100})
            response.raise_for_status()
            services = response.json()["result"]["data"]
            # print("services: ", services)
            best_match_id = ""
            best_match_score = 0

            for service in services:
                score = fuzz.ratio(service_name.lower(), service["name"].lower())
                if score > best_match_score:
                    best_match_score = score
                    best_match_id = service["id"]
            if best_match_id:
                # Fetch the price details using the best match ID
                price_url = BASE_URL + f"tickets/service/{best_match_id}"
                print("price_url: ", price_url)
                price_response = requests.get(price_url)
                print("price_response: ", price_response.json())
                # price_response.raise_for_status()
                for ticket in price_response.json().get("result", []):
                    combined_data += f"Loại vé {service_name} đối với {ticket['ticketType']['name']}, Giá: {ticket['price']} VNĐ.\n"
            
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(template="utter_error")
        
        
        return [SlotSet("combined_data", combined_data)]
    
class ActionGuideServices(Action):

    def name(self) -> Text:
        return "action_guide_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionShuttleServices(Action):

    def name(self) -> Text:
        return "action_shuttle_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionLaundryServices(Action):

    def name(self) -> Text:
        return "action_laundry_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionVipServices(Action):

    def name(self) -> Text:
        return "action_vip_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []

class ActionChildFriendlyServices(Action):

    def name(self) -> Text:
        return "action_child_friendly_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionWifiServices(Action):

    def name(self) -> Text:
        return "action_wifi_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionPetPolicy(Action):

    def name(self) -> Text:
        return "action_pet_policy"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
    
class ActionAccessibilityServices(Action):

    def name(self) -> Text:
        return "action_accessibility_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []   
    
class ActionHealthServices(Action):

    def name(self) -> Text:
        return "action_health_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        return []
