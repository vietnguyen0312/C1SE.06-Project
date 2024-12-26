import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonCPN from '../../../components/Button/Button';
import { NameRoom, TypeRoom, StatusRoomBooked, StatusRoomAvailable } from '../Rooms';
import { Checkbox } from 'antd';
import { toast } from 'react-toastify';
import axios from "../../../Configuration/AxiosConfig";
import debounce from 'lodash/debounce';


const RoomItem = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: auto;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);  
    padding: 15px;
    gap: 10px;
`;

const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 16px;
    width: 250px;
    outline: none;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:focus {
        border-color: #4a90e2;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    &::placeholder {
        color: #aaa;
    }
`;

const InputContainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const SearchDropdown = styled.div`
  position: absolute;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 200px;
  margin-left: 20px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0; 
  }
`;

const ServiceName = styled.div`
`;

const ServiceType = styled.div`
  color: #bebebe;
`;

const ServiceImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const CustomerCheckInCheckOut = () => {
    const [bookingRoomId, setBookingRoomId] = useState('');
    const [room, setRoom] = useState([]);
    const [showRoom, setShowRoom] = useState(false);
    const [filteredCustomer, setFilteredCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [nameCustomer, setNameCustomer] = useState('');
    const [phoneCustomer, setPhoneCustomer] = useState('');

    useEffect(() => {
        const debounceSearchCustomer = debounce(() => {
            handleSearchCustomer(nameCustomer, phoneCustomer);
        }, 700);

        debounceSearchCustomer();

        return () => {
            debounceSearchCustomer.cancel();
        };
    }, [nameCustomer, phoneCustomer]);

    const handleSearchCustomer = async (name, phoneNumber) => {

        let searchByPhoneNumber = [];

        if (phoneNumber !== '') {
            const responseByPhoneNumber = await axios.get('/users/booking/byPhone', { params: { search: phoneNumber.toLowerCase() } });
            searchByPhoneNumber = responseByPhoneNumber.result.data;

            setFilteredCustomer(searchByPhoneNumber);
        }

    };

    const getRoomStatus = (bookingRoomDetail) => {
        // const checkInDate = new Date(bookingRoomDetail.bookingRoom.checkInDate);
        // const checkOutDate = new Date(bookingRoomDetail.bookingRoom.checkOutDate);
        // const currentDate = new Date();

        // // Format dates to compare only the date part (not time)
        // const formattedCheckIn = checkInDate.toISOString().split("T")[0];
        // const formattedCheckOut = checkOutDate.toISOString().split("T")[0];

        if (bookingRoomDetail.checkIned === null && bookingRoomDetail.checkOuted === null) {
            return "chờ check-in";
        }
        else if (bookingRoomDetail.checkOuted === null) {
            return "đang dùng";
        }
        else if (bookingRoomDetail.checkOuted !== null) {
            return "đã rời đi";
        }

        // else if (formattedCheckIn === formattedCheckOut) {
        //     // Same day booking
        //     return checkOutDate < currentDate ? "quá hạn" : "trong ngày";
        // } else {
        //     // Multiple day booking
        //     return checkOutDate < currentDate ? "quá hạn" : "đã đặt";
        // }


    };

    const handleSearch = () => {
        setShowRoom(false);
        setRoom([]);

        if (bookingRoomId === '' && phoneCustomer === '') {
            toast.warn("Vui lòng nhập mã hóa đơn hoặc số điện thoại để tìm kiếm");
            return;
        }

        const phoneRegex = /^[0-9]+$/;

        if (phoneCustomer && !phoneRegex.test(phoneCustomer)) {
            toast.warn("Số điện thoại chỉ được chứa các chữ số. Vui lòng nhập lại.");
            return;
        }

        if (bookingRoomId) {
            handleBookingRoomdetailAPI(bookingRoomId);
        } else if (phoneCustomer) {
            handleBookingRoomdetailAPIPhone(phoneCustomer);
        }
    };

    const handleBookingRoomdetailAPIPhone = async (phone) => {
        setFilteredCustomer([]);
        const response = await axios.get(`/booking_room_details/byBookingRoom/byStaff1/${phone}`);
        if (response.result.length === 0) {
            toast.warn("Số điện thoại không tồn tại hoặc không có phòng được đặt");
        } else {
            setRoom(response.result);
            setShowRoom(true);
            toast.success("Các phòng hợp lệ của số điện thoại đã được tìm thấy");
        }

    };

    const handleBookingRoomdetailAPI = async (bookingRoomId) => {

        const response = await axios.get(`/booking_room_details/byBookingRoom/byStaff/${bookingRoomId}`);
        if (response.result.length === 0) {
            toast.warn("Mã hóa đơn không tồn tại");
            if (phoneCustomer) {
                handleBookingRoomdetailAPIPhone(phoneCustomer);
            }
        } else {
            setRoom(response.result);
            setShowRoom(true);
            toast.success("Các phòng của mã hóa đơn đã được tìm thấy");
        }
    };

    const handleBookingRoomIdChange = (e) => {
        setBookingRoomId(e.target.value);
    };


    const handlePhoneChange = (e) => {
        // setPhone(e.target.value);
        setPhoneCustomer(e.target.value)


    };

    const formattedDate = (date) => {
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false // Nếu muốn theo giờ 24
        });
    };

    const updateCheckInStatus = async (bookingRoomDetail, checked) => {

        if (bookingRoomDetail.checkOuted !== null) {
            toast.error("Phòng đã check-out");
            return;
        }
        var payload;
        if (checked) {
            payload = { checkIned: new Date().toISOString() };
        }
        else {
            payload = { checkIned: null };
        }
        const response = await axios.put(`/booking_room_details/${bookingRoomDetail.id}`, payload);


        setRoom(prevRooms => {
            const updatedRooms = prevRooms.map(roomDetail =>
                roomDetail.id === bookingRoomDetail.id ? { ...roomDetail, ...response.result } : roomDetail
            );
            return updatedRooms;
        });

        toast.success("check-in thành công");

    };

    const updateCheckOutStatus = async (bookingRoomDetail, checked) => {

        if (bookingRoomDetail.checkIned === null) {
            toast.error("Phòng không được check-in");
            return;
        }
        if (checked) {
            const payload = { checkOuted: new Date().toISOString(), checkIned: bookingRoomDetail.checkIned };
            const response = await axios.put(`/booking_room_details/${bookingRoomDetail.id}`, payload);
            setRoom(prevRooms => prevRooms.map(roomDetail =>
                roomDetail.id === bookingRoomDetail.id ? { ...roomDetail, ...response.result } : roomDetail
            ));
            toast.success("check-out thành công");

        }
        else {
            const payload = { checkOuted: null, checkIned: bookingRoomDetail.checkIned };

            const response = await axios.put(`/booking_room_details/${bookingRoomDetail.id}`, payload);
            setRoom(prevRooms => prevRooms.map(roomDetail =>
                roomDetail.id === bookingRoomDetail.id ? { ...roomDetail, ...response.result } : roomDetail
            ));
            toast.success("check-out thành công");

        }
    };

    const handleCheckInChange = (e, bookingRoomDetail) => {
        const checked = e.target.checked;
        updateCheckInStatus(bookingRoomDetail, checked);
    };

    const handleCheckOutChange = (e, bookingRoomDetail) => {
        const checked = e.target.checked;
        updateCheckOutStatus(bookingRoomDetail, checked);
    };

    return (
        <InputContainer>
            <SearchContainer>
                <SearchInput
                    placeholder="Mã hóa đơn"
                    value={bookingRoomId}
                    onChange={handleBookingRoomIdChange}
                    style={{ position: 'relative', marginBottom: '20px' }}
                />
                <h1>hoặc</h1>
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <SearchInput
                        placeholder="Số điện thoại"
                        value={phoneCustomer}
                        onChange={handlePhoneChange}
                    />
                    {filteredCustomer.length > 0 && (
                        <SearchDropdown style={{
                            position: 'absolute', // Định vị tuyệt đối so với container cha
                            top: '100%', // Hiển thị ngay bên dưới input
                            left: 0, // Căn trái theo input
                            width: '100%', // Độ rộng bằng với input
                            zIndex: 10, // Hiển thị trên các phần tử khác
                            backgroundColor: '#fff', // Nền trắng
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Hiệu ứng đổ bóng
                            borderRadius: '5px',
                            padding: '10px',
                            maxHeight: '200px', // Giới hạn chiều cao dropdown
                            overflowY: 'auto' // Kích hoạt cuộn nếu danh sách dài
                        }}>
                            {filteredCustomer.map((customer, index) => (
                                <DropdownItem key={index} onClick={() => {
                                    setFilteredCustomer([]);
                                    setSelectedCustomer(customer);
                                    setNameCustomer(customer.username);
                                    setPhoneCustomer(customer.phoneNumber);
                                    handleBookingRoomdetailAPIPhone(customer.phoneNumber);


                                }}>
                                    <ServiceImg src={`${customer.avatar}`} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                                    <div style={{ marginLeft: '10px' }}>
                                        <ServiceName>{customer.username}</ServiceName>
                                        <ServiceType>{customer.phoneNumber}</ServiceType>
                                    </div>
                                </DropdownItem>
                            ))}
                        </SearchDropdown>
                    )}
                </div>

            </SearchContainer>
            <ButtonCPN
                text="Tìm kiếm"
                style={{ width: '200px' }}
                onClick={handleSearch}
            />

            {showRoom && room.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    {room.map((bookingRoomDetail, index) => (
                        <RoomItem key={index}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <NameRoom>Phòng: {bookingRoomDetail.room.roomNumber}</NameRoom>
                                    {(() => {
                                        const status = getRoomStatus(bookingRoomDetail);
                                        if (status === "quá hạn") {
                                            return <StatusRoomBooked style={{ backgroundColor: "aqua" }}>Quá hạn</StatusRoomBooked>;
                                        } else if (status === "chờ check-in") {
                                            return <StatusRoomBooked style={{ backgroundColor: "#FFCCFF" }}>Chờ check-in</StatusRoomBooked>;
                                        } else if (status === "đang dùng") {
                                            return <StatusRoomBooked style={{ backgroundColor: "green" }}>Đang dùng</StatusRoomBooked>;
                                        } else if (status === "đã rời đi") {
                                            return <StatusRoomBooked style={{ backgroundColor: "red" }}>Đã rời đi</StatusRoomBooked>;
                                        } else {
                                            return <StatusRoomBooked>Đã đặt</StatusRoomBooked>;
                                        }
                                    })()}
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <TypeRoom>
                                        Loại phòng: {bookingRoomDetail.room.roomType.name}
                                    </TypeRoom>
                                    <div style={{ marginTop: '5px' }}>
                                        Người đặt: {bookingRoomDetail.bookingRoom.user.username}
                                    </div>
                                    <div style={{ marginTop: '5px', whiteSpace: 'pre' }}>
                                        check-in: {formattedDate(new Date(bookingRoomDetail.bookingRoom.checkInDate))}

                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        check-out: {formattedDate(new Date(bookingRoomDetail.bookingRoom.checkOutDate))}

                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        Giá: {bookingRoomDetail.price} VND
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Checkbox
                                    checked={!!bookingRoomDetail.checkIned}
                                    onChange={(e) => handleCheckInChange(e, bookingRoomDetail)}
                                >
                                    Check in
                                </Checkbox>

                                <Checkbox
                                    checked={!!bookingRoomDetail.checkOuted}
                                    onChange={(e) => handleCheckOutChange(e, bookingRoomDetail)}
                                >
                                    Check out
                                </Checkbox>
                            </div>
                        </RoomItem>

                    ))}
                </div>
            )}


            {/* {showRoom && (
                <RoomItem>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <NameRoom>Phòng: 101</NameRoom>
                            {roomStatus === "quá hạn" ? (
                                <StatusRoomBooked>Quá hạn</StatusRoomBooked>
                            ) : (
                                <StatusRoomAvailable>hoạt động</StatusRoomAvailable>
                            )}
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <TypeRoom>
                                Loại phòng: Deluxe
                            </TypeRoom>
                            <div style={{ marginTop: '5px' }}>
                                Người đặt: 1,200,000 VND
                            </div>
                            <div style={{ marginTop: '5px', whiteSpace: 'pre' }}>
                                check-in: 20/20/2020
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                check-out : 20/20/2020
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                Giá : 1,200,000 VND
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Checkbox>Check in</Checkbox>
                        <Checkbox>Check out</Checkbox>
                    </div>
                </RoomItem>
            )} */}
        </InputContainer>
    );
};

export default CustomerCheckInCheckOut;
