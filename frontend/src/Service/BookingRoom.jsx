import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../Configuration/AxiosConfig";
import ButtonCPN from '../components/Button/Button';
import RoomCard from '../components/RoomCard';
import { Navigate } from "react-router-dom";
import { format } from 'date-fns';
import moment from 'moment-timezone';


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  margin-top: 150px;
  height: 30vh;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  color: white;
  font-size: 90px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BannerSectionHotels = styled.section`
  background-image: url('/img/hotels/headerHotel.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
  outline: none;
`;

const DatePickerContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const ContainerDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  width: 50%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  user-select: none;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 2px solid #f8b600;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 250px;

  &:focus {
    border-color: #000;
    max-width: 250px;
  }
`;

const RoomSelection = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  height: auto;
  margin: auto;
`;

const DateInfo = styled.div`
  display: flex;
  gap: 20px;
`;


const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #f8b600;
  width: 70%;
  p {
    font-size: 18px;
    color: #333;
    margin: 0;
  }

  a {
    padding: 10px 20px;
    color: black;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        color: #f8b600; 
    }
  }
  
`;

const RoomImage = ({ imageUrl, name, onClick, isSelected }) => {
    return (
        <div style={{ margin: '10px', textAlign: 'center', cursor: 'pointer', boxShadow: isSelected ? '0px 0px 10px #888888' : 'none' }} onClick={onClick}>
            <img src={imageUrl} alt={name} style={{ width: '100px', height: '100px' }} />
            <p>{name}</p>
        </div>
    );
};

class BookingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            showRoomSelection: false,
            totalPrice: 0,
            page: 1,  // Thêm trang để phân trang khi lấy phòng
            pageRoomType: {},
            rooms_type: [],
            selectedRooms: [],
            rooms: [],
            roomPrice: 0,
            roomPiceList: {},
            roomId: props.roomTypeId,  // Lấy roomTypeId từ props
            hasMore: true,
            selectedRoomsDetails: [], // Kiểm soát việc tải thêm
            currentRoomDetails: [], // Thêm trường này để lưu thông tin phòng hiện tại được chọn
            selectedImage: null,
            sampleImages: [], // Khởi tạo mảng ảnh là rỗng
            selectedRoomsInfo: [],
            roomTypes: [],
            roomsByType: {},
            selectedRoomDetails: [],
            activeRoomIndex: 0
        };
        this.lastPostElementRef = createRef(); // Tạo ref cho phần tử cuối cùng
    }

    componentDidMount() {
        AOS.init({ duration: 2000 });
        this.fetchRoomType();
        this.fetchRoomTypes();
        const selectedImage = this.state.sampleImages.find(img => img.id === this.state.roomId);
        if (selectedImage) {
            this.setState({ selectedImage: selectedImage.url });
        }
    }


    setupObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && this.state.hasMore) {
                // this.fetchRoom(this.startDate, this.state.roomId);
                this.handleRoomTypeSelect(this.state.activeRoomIndex);
                // console.log("Phần tử cuối đã xuất hiện, tải thêm dữ liệu..."); // Kiểm tra log khi phần tử cuối cùng xuất hiện
            }
        });

        if (this.lastPostElementRef.current) {
            observer.observe(this.lastPostElementRef.current); // Quan sát phần tử cuối cùng
            // console.log("Đã thiết lập quan sát cho phần tử cuối cùng");
        }
    };

    fetchRoomType = async () => {
        const response = await axios.get(`/room_type/${this.state.roomId}`);
        const roomTypeName = response.result.name;
        this.setState({
            rooms_type: response.result,
            roomPrice: response.result.price,
        }, () => {
            console.log("đầy là cảnh báo  " + this.state.rooms_type.name + " dsadsads");
            const index = this.state.roomTypes.findIndex(roomType => roomType.name === roomTypeName);
            if (index !== -1) {
                console.log(`Room type "${roomTypeName}" là phần tử số ${index} của roomTypes.`);
                this.setState({ activeRoomIndex: index });
            } else {
                console.log(`Room type "${roomTypeName}" không có trong roomTypes.`);
                this.setState({ activeRoomIndex: 0 });
            }
        });

    };

    fetchRoomTypes = async () => {

        const response = await axios.get("/room_type");
        this.setState({ roomTypes: response.result });


        console.log(this.state.roomTypes);
        if (Array.isArray(response.result)) {

            this.dynamicVariables = {};

            this.state.roomTypes.forEach((roomType) => {
                // Tạo biến động với tên "roomType_" và id của roomType
                this.dynamicVariables[`${roomType.id}`] = roomType;
            });

            response.result.forEach((roomType) => {
                this.setState(prevState => ({
                    roomPiceList: {
                        ...prevState.roomPiceList,
                        [roomType.name]: roomType.price
                    },
                    pageRoomType: {
                        ...prevState.pageRoomType,
                        [roomType.name]: 1
                    }
                }));
            });




            this.setState({ sampleImages: response.result }, () => {
                const selectedImage = this.state.sampleImages.find(img => img.id === this.state.roomId);
                if (selectedImage) {
                    this.setState({ selectedImage: selectedImage.id });
                }
            });

        } else {
            console.error("Expected an array but got:", response.result);
            this.setState({ sampleImages: [] });
        }

    }

    fetchRoom = async (date, roomId) => {
        const size = 7; // Số lượng phòng mỗi lần tải
        const response = await axios.get(`/room/findByRoomType/${date}/${roomId}?page=${this.state.page}&size=${size}`);
        const newRooms = response.result.data;
        console.log(response.result.data);
        const roomTypeName = this.state.rooms_type?.name;

        this.setState((prevState) => ({
            rooms: [...prevState.rooms, ...newRooms],
            hasMore: response.result.totalPages !== 0, // Kiểm tra xem còn phòng để tải hay không
            pageRoomType: {
                ...prevState.pageRoomType,
                [roomTypeName]: prevState.pageRoomType[roomTypeName] + 1
            },
            roomsByType: {
                ...prevState.roomsByType,
                [roomTypeName]: [ // Sử dụng roomTypeName làm key
                    ...(prevState.roomsByType[roomTypeName] || []), // Kiểm tra và khởi tạo mảng nếu chưa tồn tại
                    ...newRooms
                ]
            }
        }), () => { // Callback sau khi state được cập nhật
            console.log("roomsByType sau khi cập nhật:", this.state.roomsByType);
            console.log("pageRoomType sau khi cập nhật:", this.state.pageRoomType);
        });
    };


    calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        return diffInDays + 1;
    };

    handleBookingClick = () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const { startDate, endDate } = this.state;
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            if (start < currentDate) {
                alert('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!');
                return;
            }
            if (end < start) {
                alert('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!');
                return;
            }
            this.setState({ showRoomSelection: true });
            const formattedDate = this.formatDate(startDate);
            const formattedDate1 = this.formatDate(endDate);
            this.startDate = formattedDate;
            this.endDate = formattedDate1;
            this.handleRoomTypeSelect(this.state.activeRoomIndex); // Gọi fetchRoom với ngày đã định dạng
        } else {
            alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!');
        }
    };

    BookingRoom = async () => {
        const response = await axios.get('/users/myInfo');
        const user = response.result.id;
        const now = moment.tz('Asia/Ho_Chi_Minh'); // Lấy thời gian hiện tại theo múi giờ 'Asia/Ho_Chi_Minh'

        const checkInDate = moment(this.startDate).set({
            hour: now.hours(),
            minute: now.minutes(),
            second: now.seconds()
        }).add(1, 'seconds').tz('Asia/Ho_Chi_Minh').format();  // Thêm 1 giây và định dạng lại

        // Tạo checkOutDate với giờ phút hiện tại + thêm 1 giờ
        const checkOutDate = moment(this.endDate).set({
            hour: now.hours(),
            minute: now.minutes(),
            second: now.seconds()
        }).add(1, 'seconds').tz('Asia/Ho_Chi_Minh').format();  // Thêm 1 giây và định dạng lại

        console.log(checkInDate);
        console.log(checkOutDate);
        const response1 = await axios.post('booking_room', {
            userId: user,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            total: this.state.totalPrice,
            status: 'chưa thanh toán'
        });
        console.log(response1.result);
        const gia = this.state.totalPrice / this.state.selectedRoomsDetails.length;
        console.log(gia);
        for (const room of this.state.selectedRoomsDetails) {
            const response2 = await axios.post('booking_room_details', {
                roomId: room.id,
                bookingId: response1.result.id,
                price: room.roomType.price * this.calculateDays(this.state.startDate, this.state.endDate)
            });
            console.log(response2.result);
        }
        const paymentUrl = await axios.get('/payment/vn-pay', {
            params: {
                amount: this.state.totalPrice,
                orderInfo: `r${response1.result.id}`
            }
        });
        window.location.href = paymentUrl.result;
    };

    handleRoomTypeSelect = async (index) => {

        const selectedRoomType = this.state.roomTypes[index];
        console.log("RoomType được chọn:", selectedRoomType);
        console.log(index);

        const formattedDate = this.formatDate(this.state.startDate);
        console.log(formattedDate);
        console.log(selectedRoomType.id);

        // Gọi API để lấy dữ liệu phòng
        const page = this.state.pageRoomType[selectedRoomType.name];
        console.log("page:", page);
        const response = await axios.get(`/room/findByRoomType/${formattedDate}/${selectedRoomType.id}?page=${page}&size=${7}`);
        console.log("Response từ API:", response.result.data);
        const rooms = response.result.data;

        // Cập nhật state và sử dụng callback để đảm bảo state đã được cập nhật
        this.setState((prevState) => {

            const existingRooms = prevState.roomsByType[selectedRoomType.name] || [];
            const hasMore = response.result.totalPages !== 0; // Điều kiện kiểm tra trang
            const nextPage = hasMore ? prevState.page + 1 : prevState.page;
            return {
                roomsByType: {
                    ...prevState.roomsByType, // Giữ lại dữ liệu cũ
                    [selectedRoomType.name]: [
                        ...existingRooms, // Thêm phòng cũ
                        ...rooms // Thêm phòng mới
                    ]
                },
                pageRoomType: {
                    ...prevState.pageRoomType,
                    [selectedRoomType.name]: prevState.pageRoomType[selectedRoomType.name] + 1
                },
                page: nextPage,
                hasMore: hasMore
            };

        }, () => {
            console.log("roomsByType sau khi setState:", this.state.roomsByType);

        });
    }




    formatDate(date) {
        if (!(date instanceof Date)) {
            throw new Error("Invalid date object");
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Đảm bảo tháng có 2 chữ số
        const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số

        return `${year}-${month}-${day}`;
    }


    handlePriceClick = (room) => {
        const { selectedRooms, selectedRoomsDetails, startDate, endDate, roomPrice, roomPiceList } = this.state;
        const isSelected = selectedRooms.includes(room.roomNumber);
        const days = this.calculateDays(startDate, endDate);
        const priceForRoom = roomPiceList[room.roomType.name] * days;

        if (isSelected) {
            // Nếu phòng đã được chọn, bỏ chọn
            this.setState((prevState) => ({
                selectedRooms: prevState.selectedRooms.filter((item) => item !== room.roomNumber),
                currentRoomDetails: prevState.currentRoomDetails.filter((item) => item.id !== room.id),
                selectedRoomsDetails: prevState.selectedRoomsDetails.filter((item) => item.id !== room.id), // Cập nhật chi tiết phòng bằng ID
                totalPrice: prevState.totalPrice - priceForRoom,
            }));
        } else {
            // Nếu phòng chưa được chọn, thêm vào danh sách
            this.setState((prevState) => ({
                selectedRooms: [...prevState.selectedRooms, room.roomNumber],
                selectedRoomsDetails: [...prevState.selectedRoomsDetails, room], // Thêm thông tin chi tiết phòng
                currentRoomDetails: [...prevState.currentRoomDetails, room], // Thêm thông tin chi tiết phòng
                totalPrice: prevState.totalPrice + priceForRoom,
            }));
        }
    };


    formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };



    componentDidUpdate() {
        if (this.lastPostElementRef.current) {
            // console.log("Phần tử cuối cùng sau khi render:", this.lastPostElementRef.current);
            // console.log(this.startDate);
            this.setupObserver()
        } else {
            console.log("Phần tử cuối cùng hiện không tồn tại hoặc chưa được gán ref!");
        }
    }

    handleImageSelect = (imageId, index) => {
        console.log("Selected image ID:", imageId); // Thêm dòng này để kiểm tra giá trị truyền vào
        this.setState({ selectedImage: imageId, activeRoomIndex: index });
        console.log(this.state.activeRoomIndex);
        if (this.state.startDate !== null) {
            this.handleRoomTypeSelect(index);
        }

    }



    render() {
        const { startDate, endDate, showRoomSelection, totalPrice, rooms_type, roomPrice, selectedRooms, currentRoomDetails, selectedImage, sampleImages, roomTypes, activeRoomIndex } = this.state;

        return (
            <>
                <BannerSectionHotels>
                    <Overlay />
                    <Container>
                        <Row>
                            <AboutContent>
                                <LinkNav>
                                    <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">
                                        Xin chào đến với khách sạn Healing
                                    </StyledLink>
                                    <Title data-aos="fade-right" data-aos-delay="100">
                                        Nơi tốt nhất để <br /> nghỉ dưỡng
                                    </Title>
                                </LinkNav>
                            </AboutContent>
                        </Row>
                    </Container>
                </BannerSectionHotels>
                <ContainerDate>
                    <Row>
                        <DatePickerContainer>
                            <StyledDatePicker
                                selected={startDate}
                                onChange={(date) => this.setState({ startDate: date })}
                                selectsStart
                                dateFormat="dd 'Tháng' M yyyy"
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Chọn ngày bắt đầu"
                            />
                            <StyledDatePicker
                                selected={endDate}
                                onChange={(date) => this.setState({ endDate: date })}
                                selectsEnd
                                startDate={startDate}
                                dateFormat="dd 'Tháng' M yyyy"
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Chọn ngày kết thúc"
                            />
                        </DatePickerContainer>
                    </Row>
                    <Row>
                        {Array.isArray(this.state.sampleImages) && this.state.sampleImages.length > 0 ? (
                            this.state.sampleImages.map((image, index) => (
                                <RoomImage
                                    key={image.id}
                                    imageUrl={"/img/hotels/room_type/" + image.image}
                                    name={image.name}
                                    onClick={() => this.handleImageSelect(image.id, index)}
                                    isSelected={this.state.selectedImage === image.id}
                                />
                            ))
                        ) : (
                            <p>No images to display</p>
                        )}
                    </Row>
                    <Row>
                        <ButtonCPN text="Đặt phòng" onClick={this.handleBookingClick} />
                    </Row>
                </ContainerDate>

                {roomTypes.map((roomType, index) => (
                    <div key={index}>
                        {showRoomSelection && index === activeRoomIndex && (  // Thêm điều kiện kiểm tra index
                            <RoomSelection>
                                <h2>Thông tin phòng đã chọn: {roomType.name}</h2>
                                {startDate && endDate && (
                                    <DateInfo>
                                        <p>Ngày bắt đầu: {startDate.toLocaleDateString()}</p>
                                        <p>Ngày kết thúc: {endDate.toLocaleDateString()}</p>
                                        <p>Số ngày lưu trú: {this.calculateDays(startDate, endDate)}</p>
                                    </DateInfo>
                                )}
                                <p>Giá phòng một đêm: {this.formatCurrency(this.state.roomPiceList[roomType.name])}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid #f8b600' }}>

                                    {this.state.roomsByType[roomType.name]?.map((room, roomIndex) => {
                                        const isLastRoom = roomIndex === this.state.roomsByType[roomType.name].length - 1;

                                        return (
                                            <RoomCard
                                                ref={(el) => {
                                                    if (isLastRoom) {
                                                        this.lastPostElementRef.current = el;  // Gán ref cho phần tử cuối cùng
                                                    }
                                                }}
                                                key={room.roomNumber}
                                                room={room}
                                                isSelected={selectedRooms.includes(room.roomNumber)}
                                                onPriceClick={() => this.handlePriceClick(room)}  // Gọi hàm khi nhấp vào
                                                index={index}
                                            />
                                        );
                                    })}

                                </div>
                                {currentRoomDetails.length > 0 && (
                                    <div>
                                        <h3>Thông tin các phòng đã chọn:</h3>
                                        {currentRoomDetails.map((roomDetail, index) => {
                                            const formattedPrice = this.formatCurrency(roomDetail.roomType.price); // Sửa đây để truy cập đúng thuộc tính price
                                            return (
                                                <p key={index}>Số phòng: {roomDetail.roomNumber}, Giá: {formattedPrice}</p>
                                            );
                                        })}
                                    </div>
                                )}
                                <Payment>
                                    <p>Tổng giá trị:</p>
                                    <p>{this.formatCurrency(totalPrice)}</p>
                                    <ButtonCPN text="Đặt phòng" onClick={this.BookingRoom} />
                                </Payment>
                            </RoomSelection>
                        )}
                    </div>
                ))}
            </>
        );
    }

}

export default BookingRoom;