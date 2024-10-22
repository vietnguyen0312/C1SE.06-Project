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
import moment from 'moment-timezone';
import { toast } from 'react-toastify';

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
  font-size: 50px;
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
  width: 90%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  user-select: none;
  padding: 20px;
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
const RoomImageContainer = styled.div`
  margin: 20px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${props => props.isSelected ? '#fcfaf1' : '#fff'};
  box-shadow: ${props => props.isSelected ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : '0px 2px 6px rgba(0, 0, 0, 0.05)'};
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  border: ${props => props.isSelected ? '2px solid #f8b600' : '1px solid #ddd'};
`;
const ImageRoom = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  &:hover{
    transform: scale(1.05);
  }
`;
const RoomName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
  white-space: nowrap;
`;

const RoomImage = ({ imageUrl, name, onClick, isSelected }) => {
    return (
        <RoomImageContainer onClick={onClick} isSelected={isSelected}>
            <ImageRoom src={imageUrl} alt={name} />
            <RoomName>{name}</RoomName>
        </RoomImageContainer>
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
            const index = this.state.roomTypes.findIndex(roomType => roomType.name === roomTypeName);
            if (index !== -1) {
                this.setState({ activeRoomIndex: index });
            } else {
                this.setState({ activeRoomIndex: 0 });
            }
        });
    };

    fetchRoomTypes = async () => {

        const response = await axios.get("/room_type");
        this.setState({ roomTypes: response.result });
        if (Array.isArray(response.result)) {
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

            this.setState({ sampleImages: [] });
        }

    }

    fetchRoom = async (date, roomId) => {
        const size = 7;
        const response = await axios.get(`/room/findByRoomType/${date}/${roomId}?page=${this.state.page}&size=${size}`);
        const newRooms = response.result.data;

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
        }));
    };


    calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diffInTime = end.getTime() - start.getTime();
        let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        if (diffInDays === 0) {
            diffInDays = 1;
        }
        return diffInDays;
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
                toast.error('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!');
                // alert('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!');
                return;
            }
            if (end < start) {
                toast.error('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!');
                // alert('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!');
                return;
            }
            if (start.getTime() === end.getTime()) {
                toast.info('Khách sạn chúng tôi check-in: 14:00 check-out: 12:00 hôm sau');
                toast.info('Hiện tại bạn đang chọn chỉ ở lại trong ngày');
            }
            this.setState({ showRoomSelection: true });
            const formattedDate = this.formatDate(startDate);
            const formattedDate1 = this.formatDate(endDate);
            this.startDate = formattedDate;
            this.endDate = formattedDate1;
            this.handleRoomTypeSelect(this.state.activeRoomIndex); // Gọi fetchRoom với ngày đã định dạng
        } else {
            toast.error('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!');
            // alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!');
        }
    };

    BookingRoom = async () => {
        const response = await axios.get('/users/myInfo');
        const user = response.result.id;
        const now = moment.tz('Asia/Ho_Chi_Minh');
        const checkInDate = moment(this.startDate).tz('Asia/Ho_Chi_Minh');
        const checkOutDate = moment(this.endDate).tz('Asia/Ho_Chi_Minh');

        if (checkInDate.isSame(checkOutDate, 'day')) {
            if (checkInDate.isSame(now, 'day')) {
                checkInDate.set({
                    hour: now.hour(),
                    minute: now.minute(),
                    second: now.second()
                }).add(1, 'seconds');
            } else {
                checkInDate.set({
                    hour: 5,
                    minute: 0,
                    second: 0
                });
            }
            checkOutDate.set({
                hour: 23,
                minute: 59,
                second: 59
            }).tz('Asia/Ho_Chi_Minh').format();
        }
        else {
            if (now.hour() < 14) {
                checkInDate.set({
                    hour: 14,
                    minute: 0,
                    second: 0
                });
            } else {
                checkInDate.set({
                    hour: now.hour(),
                    minute: now.minute(),
                    second: now.second()
                }).add(1, 'seconds');
            }

            checkOutDate.set({
                hour: 12,
                minute: 0,
                second: 0
            }).tz('Asia/Ho_Chi_Minh').format();

        }

        const response1 = await axios.post('booking_room', {
            userId: user,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            total: this.state.totalPrice,
            status: 'chưa thanh toán'
        });


        for (const room of this.state.selectedRoomsDetails) {
            await axios.post('booking_room_details', {
                roomId: room.id,
                bookingId: response1.result.id,
                price: room.roomType.price * this.calculateDays(this.state.startDate, this.state.endDate)
            });

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

        const formattedDate = this.formatDate(this.state.startDate);

        const page = this.state.pageRoomType[selectedRoomType.name];

        const response = await axios.get(`/room/findByRoomType/${formattedDate}/${selectedRoomType.id}?page=${page}&size=${7}`);

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
            // console.log("Phần tử cuối cùng hiện không tồn tại hoặc chưa được gán ref!");
        }
    }

    handleImageSelect = (imageId, index) => {

        this.setState({ selectedImage: imageId, activeRoomIndex: index });

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