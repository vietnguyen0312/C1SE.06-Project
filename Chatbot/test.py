import requests
from fuzzywuzzy import fuzz
# # Địa chỉ và API Key
# api_key = "acb173d76888490990edb33af2f2f089"

# # URL OpenCage Geocoding API
# address = requests.get("http://localhost:8080/" + "faq/ask_about_location").json()['result']['description']  # Chuyển đổi phản hồi thành JSON
# print(address)
# url = f"https://api.opencagedata.com/geocode/v1/json?q={address}&key={api_key}"

# # Lấy tọa độ từ API geocoding
# geo_response = requests.get(url).json()

# # Check if 'results' is not empty before accessing it
# if geo_response['results']:
#     latitude = geo_response['results'][0]['geometry']['lat']
#     longitude = geo_response['results'][0]['geometry']['lng']
# else:
#     print("Không có kết quả từ API geocoding.")
#     exit()  # Exit the program or handle the error as needed

# weather_data = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true")
# weather_data = weather_data.json()  # Ensure this is correctly parsing the response

# # Ensure that the weather_data contains 'current_weather'
# if 'current_weather' in weather_data:
#     temperature = weather_data['current_weather']['temperature']
#     windspeed = weather_data['current_weather']['windspeed']
#     weather_description = "Có mưa" if weather_data['current_weather']['weathercode'] == 61 else "Không có mưa"
    
#     print(f"Nhiệt độ hiện tại là {temperature}°C, gió với tốc độ {windspeed} km/h. {weather_description}.")
# else:
#     print("Không thể lấy thông tin thời tiết.")

# weather_data_daily = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true")
# weather_data_daily = weather_data_daily.json()  
# # Check if 'daily' data is available before accessing it
# if 'daily' in weather_data_daily:
#     for day in weather_data_daily['daily']['time'][:3]:  # Lấy 3 ngày tới
#         max_temp = weather_data_daily['daily']['temperature_2m_max'][weather_data_daily['daily']['time'].index(day)]
#         min_temp = weather_data_daily['daily']['temperature_2m_min'][weather_data_daily['daily']['time'].index(day)]
#         precipitation = weather_data_daily['daily']['precipitation_sum'][weather_data_daily['daily']['time'].index(day)]
#         print(f"Ngày: {day}, Nhiệt độ tối đa: {max_temp}°C, Nhiệt độ tối thiểu: {min_temp}°C, Lượng mưa: {precipitation} mm.")
# else:
#     print("Không có dữ liệu dự báo hàng ngày.")
service_types_url = "http://localhost:8080/serviceTypes"
try:
    response = requests.get(service_types_url)
    response.raise_for_status()
    services = response.json()["result"]
except requests.exceptions.RequestException as e:
    print("Error fetching service types:", e)

nameServices = "Phương Tiện Di Chuyển"

best_match_id = None
best_match_score = 0

for service in services:
    score = fuzz.ratio(nameServices.lower(), service["name"].lower())
    if score > best_match_score:
        best_match_score = score
        best_match_id = service["id"]

if best_match_id:
    print(f"Dịch vụ tốt nhất là: {best_match_id}")
     # Bước 4: Gọi API để lấy thông tin chi tiết về dịch vụ
    detail_service_url = f"http://localhost:8080/services?page=1&size=6&serviceTypeId={best_match_id}&search="
    try:
        detail_response = requests.get(detail_service_url)
        detail_response.raise_for_status()
        detail_data = detail_response.json()
        
        # Giả sử thông tin chi tiết nằm trong trường "result"
        if "result" in detail_data:
            service_details = detail_data["result"]["data"]
            # Trả về thông tin cho người dùng
            service_names = [x["name"] for x in service_details]  # Use list comprehension instead of map
            print(', '.join(service_names))
            
        else:
            print("Xin lỗi, không tìm thấy thông tin chi tiết về dịch vụ.")
    except requests.exceptions.RequestException as e:
        print("Error fetching service details:", e)
     

else:
    print("Không tìm thấy dịch vụ phù hợp.")
