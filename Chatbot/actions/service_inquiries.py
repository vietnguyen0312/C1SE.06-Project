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

class ActionListServices(Action):

    def name(self) -> Text:
        return "action_list_services"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # URL của API
        url = BASE_URL + "serviceTypes"
        combined_data = ""
        try:
            # Gửi yêu cầu GET đến API
            response = requests.get(url)
            response.raise_for_status()  # Kiểm tra mã trạng thái HTTP

            data = response.json()
            

            if "result" in data and isinstance(data["result"], list):
                services = data["result"]
                num_services = len(services)

                service_list = ", ".join([service["name"] for service in services])

                combined_data = f"Hiện tại có {num_services} loại dịch vụ: {service_list}."
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
        
        service_name = tracker.get_slot("service_name")
        set_slot = SlotSet("service_name", service_name)
        
        try:
            response = requests.get(BASE_URL + "serviceTypes")
            response.raise_for_status()
            services = response.json()["result"]
            best_match_id = None
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
                return [SlotSet("combined_data", combined_data), set_slot]
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
