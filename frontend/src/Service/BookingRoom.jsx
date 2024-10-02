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

class BookingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            showRoomSelection: false,
            totalPrice: 0,
            page: 1,  // Thêm trang để phân trang khi lấy phòng
            rooms_type: [],
            selectedRooms: [],
            rooms: [],
            roomPrice: 0,
            roomId: props.roomTypeId,  // Lấy roomTypeId từ props
            hasMore: true,
            selectedRoomsDetails: [], // Kiểm soát việc tải thêm
        };
        this.lastPostElementRef = createRef(); // Tạo ref cho phần tử cuối cùng
    }

    componentDidMount() {
        AOS.init({ duration: 2000 });
        this.fetchRoomType();
    }

    setupObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && this.state.hasMore) {
                this.fetchRoom(this.startDate);
                // console.log("Phần tử cuối đã xuất hiện, tải thêm dữ liệu..."); // Kiểm tra log khi phần tử cuối cùng xuất hiện
            }
        });

        if (this.lastPostElementRef.current) {
            observer.observe(this.lastPostElementRef.current); // Quan sát phần tử cuối cùng
            // console.log("Đã thiết lập quan sát cho phần tử cuối cùng");
        }
    };

    fetchRoomType = async () => {
        try {
            const response = await axios.get(`/room_type/${this.state.roomId}`);
            this.setState({
                rooms_type: response.result,
                roomPrice: response.result.price,
            });
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };


    fetchRoom = async (date) => {
        const size = 7; // Số lượng phòng mỗi lần tải
        try {
            const response = await axios.get(`/room/findByRoomType/${date}/${this.state.roomId}?page=${this.state.page}&size=${size}`);
            const newRooms = response.result.data;
            console.log(response.result.data);
            this.setState((prevState) => ({
                rooms: [...prevState.rooms, ...newRooms],
                hasMore: response.result.totalPages !== 0, // Kiểm tra xem còn phòng để tải hay không
                page: prevState.page + 1,

            }));
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
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
            const formattedDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
            const formattedDate1 = this.formatDate(endDate);
            this.startDate = formattedDate;
            this.endDate = formattedDate1;
            this.fetchRoom(formattedDate); // Gọi fetchRoom với ngày đã định dạng
        } else {
            alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!');
        }
    };

    BookingRoom = async () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        console.log(token);
        if (!token) {
            window.location.href = '/authentication';
            return null;
        } else {
            const response = await axios.get('/users/myInfo');
            console.log(response.result.id);
            console.log(response.result);
            console.log(this.startDate);
            console.log(this.endDate);
            console.log(this.state.totalPrice);

            const user = response.result.id;


            const checkInDate = this.startDate instanceof Date ? this.startDate.toISOString() : new Date(this.startDate).toISOString();
            const checkOutDate = this.endDate instanceof Date ? this.endDate.toISOString() : new Date(this.endDate).toISOString();

            const response1 = await axios.post('booking_room', {
                userId: user,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                total: this.state.totalPrice,
                status: 'Đã xác nhận'
            });

            console.log(response1.result);
            console.log(this.state.selectedRoomsDetails);

            const gia = this.state.totalPrice / this.state.selectedRoomsDetails.length;
            console.log(gia);
            for (const room of this.state.selectedRoomsDetails) {
                const response2 = await axios.post('booking_room_details', {
                    roomId: room.id,
                    bookingId: response1.result.id,
                    price: gia
                });

                console.log(response2.result);
            }
        }

    };



    formatDate(date) {
   

        if (!(date instanceof Date)) {
            throw new Error("Invalid date object");
        }

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    handlePriceClick = (room) => {
        const { selectedRooms, selectedRoomsDetails, startDate, endDate, roomPrice } = this.state;
        const isSelected = selectedRooms.includes(room.roomNumber);
        const days = this.calculateDays(startDate, endDate);
        const priceForRoom = roomPrice * days;

        if (isSelected) {
            // Nếu phòng đã được chọn, bỏ chọn
            this.setState((prevState) => ({
                selectedRooms: prevState.selectedRooms.filter((item) => item !== room.roomNumber),
                selectedRoomsDetails: prevState.selectedRoomsDetails.filter((item) => item.id !== room.id), // Cập nhật chi tiết phòng bằng ID
                totalPrice: prevState.totalPrice - priceForRoom,
            }));
        } else {
            // Nếu phòng chưa được chọn, thêm vào danh sách
            this.setState((prevState) => ({
                selectedRooms: [...prevState.selectedRooms, room.roomNumber],
                selectedRoomsDetails: [...prevState.selectedRoomsDetails, room], // Thêm thông tin chi tiết phòng
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

    render() {
        const { startDate, endDate, showRoomSelection, rooms, totalPrice, rooms_type, roomPrice, selectedRooms } = this.state;

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
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Chọn ngày bắt đầu"
                            />
                            <StyledDatePicker
                                selected={endDate}
                                onChange={(date) => this.setState({ endDate: date })}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Chọn ngày kết thúc"
                            />
                        </DatePickerContainer>
                    </Row>
                    <Row>
                        <ButtonCPN text="Đặt phòng" onClick={this.handleBookingClick} />
                    </Row>
                </ContainerDate>
                {showRoomSelection && (
                    <RoomSelection>
                        <h2>Thông tin phòng đã chọn: {rooms_type.name}</h2>
                        {startDate && endDate && (
                            <DateInfo>
                                <p>Ngày bắt đầu: {startDate.toLocaleDateString()}</p>
                                <p>Ngày kết thúc: {endDate.toLocaleDateString()}</p>
                                <p>Số ngày lưu trú: {this.calculateDays(startDate, endDate)}</p>
                            </DateInfo>
                        )}
                        <p>Giá phòng một đêm: {this.formatCurrency(roomPrice)}</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid #f8b600' }}>

                            {rooms.map((room, index) => {
                                const isLastRoom = rooms.length === index + 1;

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
                        <Payment>
                            <p>Tổng giá trị:</p>
                            <p>{this.formatCurrency(totalPrice)}</p>
                            <ButtonCPN text="Đặt phòng" onClick={this.BookingRoom} />
                        </Payment>
                    </RoomSelection>
                )}
            </>
        );
    }

}

export default BookingRoom;