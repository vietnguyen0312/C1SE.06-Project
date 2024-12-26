import os
import requests
import json
from dotenv import load_dotenv
from datetime import datetime
import re
# Load biến môi trường từ tệp .env
load_dotenv()

def get_room_type():
    # Lấy URL từ biến môi trường
    api_url = os.getenv("API_URL") + "/room_type"
    
    # In ra URL để kiểm tra
    print(f"URL API: {api_url}")
    
    if not api_url:
        return {"error": "Không tìm thấy URL của API."}

    # Gửi yêu cầu GET đến API
    response = requests.get(api_url)
    
    # In ra mã trạng thái của response
    print(f"Response status code: {response.status_code}")
    
    if response.status_code == 200:
        # Nếu API trả về dữ liệu thành công, trả về kết quả JSON
        return response.json()["result"]
    else:
        # In ra nội dung response nếu có lỗi
        print(f"Response content: {response.content}")
        return {"error": "Không thể lấy thông tin giá vé từ API."}

def get_room():
    # Lấy URL từ biến môi trường
    api_url = os.getenv("API_URL") + "/room"
    
    # In ra URL để kiểm tra
    print(f"URL API: {api_url}")
    
    if not api_url:
        return {"error": "Không tìm thấy URL của API."}

    # Gửi yêu cầu GET đến API
    response = requests.get(api_url)
    
    # In ra mã trạng thái của response
    print(f"Response status code: {response.status_code}")
    
    if response.status_code == 200:
        # Nếu API trả về dữ liệu thành công, trả về kết quả JSON
        return response.json()["result"]
    else:
        # In ra nội dung response nếu có lỗi
        print(f"Response content: {response.content}")
        return {"error": "Không thể lấy thông tin giá vé từ API."}


def get_empty_room():
    api_url = os.getenv("API_URL") + "/room/findByRoomType/entity"
    
     # In ra URL để kiểm tra
    print(f"URL API: {api_url}")
    
    if not api_url:
        return {"error": "Không tìm thấy URL của API."}

    # Gửi yêu cầu GET đến API
    response = requests.get(api_url)
    
    # In ra mã trạng thái của response
    print(f"Response status code: {response.status_code}")
    
    if response.status_code == 200:
        # Nếu API trả về dữ liệu thành công, trả về kết quả JSON
        return response.json()["result"]
    else:
        # In ra nội dung response nếu có lỗi
        print(f"Response content: {response.content}")
        return {"error": "Không thể lấy thông tin giá vé từ API."}


def get_rooms_by_checkin_and_roomtype(check_in_date, room_type_id):
    # Lấy URL từ biến môi trường
    api_url = os.getenv("API_URL") + f"/room/findByRoomType/{check_in_date}/{room_type_id}"
    
    print(f"URL API: {api_url}")
    
    if not api_url:
        return {"error": "Không tìm thấy URL của API."}

    # Gửi yêu cầu GET đến API
    response = requests.get(api_url)
    
    # In ra mã trạng thái của response
    print(f"Response status code: {response.status_code}")
    
    if response.status_code == 200:
        # Nếu API trả về dữ liệu thành công, trả về kết quả JSON
        json_response = response.json()
        if "result" in json_response and "data" in json_response["result"]:
            return json_response["result"]["data"]  # Trả về danh sách phòng
        else:
            return {"error": "Dữ liệu không hợp lệ trong phản hồi."}
    else:
        # In ra nội dung response nếu có lỗi
        print(f"Response content: {response.content}")
        return {"error": "Không thể lấy thông tin phòng từ API."}
    

def convert_to_date(date_str: str) -> str:
    try:
        # Loại bỏ ký tự không cần thiết như "ngày"
        date_str = date_str.lower().replace("ngày", "").strip()

        # Xử lý các định dạng khác nhau bằng regex
        patterns = [
            r'(\d{1,2})[\/\- ](\d{1,2})',                # Định dạng 6/10, 6-10, 6 10
            r'(\d{1,2}) tháng (\d{1,2})',                 # Định dạng "6 tháng 10"
            r'(\d{1,2}) tháng (\d{1,2}) năm (\d{4})'      # Định dạng "6 tháng 10 năm 2024"
        ]

        day = month = None
        for pattern in patterns:
            match = re.match(pattern, date_str)
            if match:
                day, month = match.groups()
                break

        if not day or not month:
            return None  # Nếu không khớp với bất kỳ định dạng nào
        
        # Chuyển đổi sang số nguyên và xác định năm hiện tại
        day = int(day.strip())
        month = int(month.strip())
        year = datetime.now().year  # Năm hiện tại

        # Tạo đối tượng datetime từ ngày và tháng
        check_in_date = datetime(year, month, day)

        # Trả về ngày dưới dạng định dạng YYYY-MM-DD
        return check_in_date.strftime("%Y-%m-%d")
    
    except Exception as e:
        print(f"Lỗi khi chuyển đổi ngày: {e}")
        return None

if __name__ == "__main__":
    print(convert_to_date("ngày 6 tháng 10"))  # Kết quả mong đợi: YYYY-MM-DD
