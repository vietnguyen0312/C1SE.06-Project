import React, { Component } from 'react';
import styled from 'styled-components';
import { DashboardContainer } from './Dashboard';
import axios from "../../Configuration/AxiosConfig";
import AOS from 'aos';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ModalTitle, ModalWrapper, ModalHeader, ModalBody } from '../PublicLayout/HistoryBill/style';
import ButtonCPN from '../../components/Button/Button';
import { toast } from 'react-toastify';
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const Item = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const RoomItem = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 200px;
    width: 270px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);  
    padding: 15px;
    gap: 10px;
`;
const RoomContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    justify-items: center;
    margin-top: 20px;
`;
const NameRoom = styled.div`
    font-size: 20px;
    font-weight: 600;
`;
const TypeRoom = styled.div`
    font-size: 13px;
    color: #888;
`;
const StatusRoomBooked = styled.div`
    font-size: 14px;
    background-color: #ffcccc; 
    padding: 10px;
    border-radius: 10px;
`;

const StatusRoomAvailable = styled.div`
    font-size: 14px;
    background-color: #ccffcc; 
    padding: 10px;
    border-radius: 10px;
`;

const SelectedRoom = styled.select`
    width: 70%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 10px;
    cursor: pointer;
`

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: { grouped: {} },
            bookings: [],
            page: 1,
            totalPages: 1,
            totalRoom: 0,
            hasMore: true,
            selectedRoom: [],
            showModal: false,
            bookingRoomSelected: null,
            bookingRoomSelectedModel: [],
            bookingRoomDetailByRoomId: [],
            Option: false,
            roomType: [],
            selectedRoomUpdate: null,
            addRoom: false,
            updateRoom: false,
            roomNumberAdd: null,
            roomTypeAdd: null,
            statusAdd: null,
            roomTypeSelected: '',
            statusSelected: '',
            statusSelectedFilter: null,
            messages: [],
        };
        this.roomRefs = [];
        this.stompClient = null;
    }

    componentDidMount() {
        AOS.init({ duration: 2000 });
        this.fetchRooms();
        this.fetchBookingRoomsDetail();

        // Kết nối WebSocket qua SockJS
        const socket = new SockJS("http://localhost:8080/ws");

        // Khởi tạo stompClient
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });


        this.stompClient.onConnect = () => {


            this.stompClient.subscribe("/topic/room-updates", (message) => {

                this.getBookingRoomDetail(message.body);
            });
        };

        // this.stompClient.onStompError = (frame) => {
        //     console.error("STOMP error: ", frame.headers["message"]);
        // };

        // Kích hoạt kết nối STOMP
        this.stompClient.activate();
    }

    componentWillUnmount() {
        if (this.stompClient) {
            this.stompClient.deactivate();
        }
    }

    getBookingRoomDetail = async (bookingRoomId) => {

        const response = await axios.get(`/booking_room_details/byBookingRoom/byStaff/${bookingRoomId}`);


        if (!response || !response.result) {
            return;
        }

        const bookingRooms = response.result;

        const bookings = bookingRooms.reduce((acc, bookingDetail) => {
            if (bookingDetail.room && bookingDetail.room.id) {
                acc[bookingDetail.room.id] = bookingDetail;
            }
            return acc;
        }, {});

        let updatedBookings = { ...this.state.bookings };  // Initialize as a copy of the current bookings
        let updatedBookingRoomDetailByRoomId = { ...this.state.bookingRoomDetailByRoomId };

        // Process bookingRooms
        bookingRooms.forEach(room => {
            const checkInDate = room.bookingRoom?.checkInDate;
            const roomId = room.room?.id;

            if (roomId && new Date(checkInDate) < new Date(new Date().setHours(23, 59, 59, 999))) {
                updatedBookings = { ...updatedBookings, ...bookings };  // Merge the new bookings into the existing object
            } else if (roomId) {
                const updatedBookingRoomDetails = {
                    [roomId]: bookingRooms.map(item => ({
                        ...item,
                        idRoom: item?.id
                    }))
                };

                updatedBookingRoomDetailByRoomId = {
                    ...updatedBookingRoomDetailByRoomId,
                    ...updatedBookingRoomDetails
                };
            }
        });

        // Update state after all processing
        this.setState({
            bookings: updatedBookings,
            bookingRoomDetailByRoomId: updatedBookingRoomDetailByRoomId
        });


        return bookingRooms;

    };




    fetchBookingRoomsDetail = async () => {

        const response = await axios.get(`/booking_room_details/active`);

        if (response && response.result) {
            const bookings = response.result.reduce((acc, bookingDetail) => {
                acc[bookingDetail.room.id] = bookingDetail;
                return acc;
            }, {});

            const bookingRoomDetailsByRoomId = response.result.reduce((acc, bookingDetail) => {
                acc[bookingDetail.room.id] = bookingDetail.id;
                return acc;
            }, {});


            this.setState({
                bookings: bookings,
                bookingRoomSelectedModel: bookingRoomDetailsByRoomId
            });

        }

    }

    fetchBookingRoomsDetailByRoomId = async (roomId) => {


        if (this.state.bookingRoomDetailByRoomId[roomId]) {

            return;
        }


        const response = await axios.get(`/booking_room_details/active/${roomId}`);


        if (response.result && response.result.length > 0) {
            const updatedBookingRoomDetails = {
                [roomId]: response.result.map(item => ({
                    ...item,
                    idRoom: item.id
                }))
            };

            this.setState(prevState => ({
                bookingRoomDetailByRoomId: {
                    ...prevState.bookingRoomDetailByRoomId,
                    ...updatedBookingRoomDetails
                }
            }));
        }

    };

    fetchRooms = async () => {

        const { page } = this.state;
        const size = 10;
        const response = await axios.get(`/room/all?page=${page}&size=${size}`);
        const data = response.result.data;

        const groupedRooms = data.reduce((acc, room) => {
            const floorNumber = Math.floor(room.roomNumber / 100);
            if (!acc[floorNumber]) {
                acc[floorNumber] = [];
            }
            acc[floorNumber].push(room);
            return acc;
        }, {});

        const totalRoomCount = Object.values(groupedRooms).reduce((acc, rooms) => acc + rooms.length, 0);

        this.setState((prevState) => ({
            rooms: {
                grouped: { ...prevState.rooms.grouped, ...groupedRooms },
            },
            totalPages: response.result.totalPages,
            totalRoom: prevState.totalRoom + totalRoomCount,
            page: page + 1,
            hasMore: page < response.result.totalPages,
        }));

    }

    fetchRooms1 = async () => {

        // const { page } = this.state;
        const size = 100;
        const response = await axios.get(`/room/all?page=${1}&size=${size}`);
        const data = response.result.data;

        const groupedRooms = data.reduce((acc, room) => {
            const floorNumber = Math.floor(room.roomNumber / 100);
            if (!acc[floorNumber]) {
                acc[floorNumber] = [];
            }
            acc[floorNumber].push(room);
            return acc;
        }, {});

        // const totalRoomCount = Object.values(groupedRooms).reduce((acc, rooms) => acc + rooms.length, 0);

        this.setState((prevState) => ({
            rooms: {
                grouped: { ...prevState.rooms.grouped, ...groupedRooms },
            },
            // totalPages: response.result.totalPages,
            // totalRoom: prevState.totalRoom + totalRoomCount,
            // page: page + 1,
            // hasMore: page < response.result.totalPages,
        }));

    }

    getRoomType = async () => {
        const response = await axios.get(`/room_type`);

        this.setState({ roomType: response.result });
    }

    handleRoomClick = async (room) => {

        await this.fetchBookingRoomsDetailByRoomId(room.id); // Chờ dữ liệu nạp xong

        // Kiểm tra nếu room.id tồn tại trong bookingRoomSelectedModel
        const bookingDetailId = this.state.bookingRoomSelectedModel[room.id];
        if (bookingDetailId) {
            this.setState({ bookingRoomSelected: bookingDetailId });
        }

        this.setState({ selectedRoom: room, showModal: true }, () => {
            this.scrollToSelectedRoom(); // Gọi sau khi modal được mở
        });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
        this.setState({ Option: false });
    }

    handleBookingRoomClick = (bookingRoomDetail) => {

        this.setState({ bookingRoomSelected: bookingRoomDetail.id });
        this.setState({ bookingRoomSelectedModel: { ...this.state.bookingRoomSelectedModel, [this.state.selectedRoom.id]: bookingRoomDetail.id } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showModal && this.state.showModal) {
            setTimeout(() => {
                this.scrollToSelectedRoom();
            }, 0); // Đảm bảo DOM đã được cập nhật
        }

        if (this.state.showModal && this.state.bookingRoomSelected !== prevState.bookingRoomSelected) {
            this.scrollToSelectedRoom();
        }

        if (this.state.showModal && this.state.bookingRoomSelectedModel[this.state.selectedRoom.id] !== prevState.bookingRoomSelected) {
            this.scrollToSelectedRoom();

        }
    }

    handleRoomSelect = (roomJson) => {
        const room = JSON.parse(roomJson);
        this.setState({
            selectedRoomUpdate: room,
            roomTypeSelected: room.roomType.id,
            statusSelected: room.status
        });
    }

    handleRoomTypeChange = (event) => {
        this.setState({ roomTypeSelected: event.target.value });
    }

    handleStatusChange = (event) => {
        this.setState({ statusSelected: event.target.value });
    }

    scrollToSelectedRoom = () => {
        const { bookingRoomDetailByRoomId, bookingRoomSelected, selectedRoom } = this.state;

        // Kiểm tra nếu selectedRoom và bookingRoomDetailByRoomId[selectedRoom.id] tồn tại
        if (selectedRoom && bookingRoomDetailByRoomId[selectedRoom.id]) {
            const selectedRoomDetails = bookingRoomDetailByRoomId[selectedRoom.id];
            const selectedRoomIndex = selectedRoomDetails.findIndex(
                (bookingDetail) => bookingDetail.id === bookingRoomSelected
            );

            if (selectedRoomIndex !== -1 && this.roomRefs[selectedRoomIndex]) {
                const roomElement = this.roomRefs[selectedRoomIndex];
                if (roomElement) {
                    roomElement.scrollIntoView({
                        behavior: "smooth", // Cuộn mượt mà
                        block: "center",   // Hiển thị phòng ở giữa màn hình
                    });
                }
            }
        }
    };

    handleOption = () => {
        this.getRoomType();
        this.fetchRooms1();
        this.setState({ Option: true });

    }

    handleDeleteRoom = async () => {
        if (!this.state.selectedRoomUpdate) {
            toast.error("Chưa chọn phòng");
            return;
        }
        try {
            const response = await axios.delete(`/room/${this.state.selectedRoomUpdate.id}`);

            if (response.code === 1000) {
                toast.success("Xóa phòng thành công");

                // Cập nhật danh sách phòng sau khi xóa
                this.setState((prevState) => {
                    const updatedRooms = Object.keys(prevState.rooms.grouped).reduce((acc, floor) => {
                        acc[floor] = prevState.rooms.grouped[floor].filter(room => room.id !== this.state.selectedRoomUpdate.id);
                        return acc;
                    }, {});

                    return {
                        rooms: { grouped: updatedRooms },
                        selectedRoomUpdate: null // Đặt lại selectedRoomUpdate
                    };
                });
            } else {
                toast.error("Xóa phòng thất bại");
            }
        } catch {
            toast.error("phòng này có booking room chưa được sử lý");
        }
    }

    handleAddRoom = async () => {
        if (this.state.addRoom == false) {
            this.setState({ addRoom: true });
            return;
        }
        if (this.state.roomNumberAdd == null || this.state.roomTypeAdd == null) {
            toast.error("Chưa điền đẩy đủ thông tin");
            return;
        }
        const response = await axios.post(`/room`, {
            roomNumber: this.state.roomNumberAdd,
            roomTypeId: this.state.roomTypeAdd,
            status: this.state.statusAdd,
        });
        this.setState((prevState) => {
            const floorNumber = Math.floor(this.state.roomNumberAdd / 100);
            const updatedRooms = {
                ...prevState.rooms.grouped,
                [floorNumber]: [
                    ...(prevState.rooms.grouped[floorNumber] || []),
                    response.result
                ]
            };

            return {
                rooms: { grouped: updatedRooms }
            };
        });
        toast.success("Thêm phòng thành công");
        this.setState({ addRoom: false });
    }

    handleUpdateRoom = async () => {
        if (this.state.addRoom == true) {
            this.setState({ addRoom: false });
            return;
        }
        if (this.state.selectedRoomUpdate == null) {
            toast.error("Chưa chọn phòng");
            return;
        }
        if (this.state.roomTypeSelected == this.state.selectedRoomUpdate.roomType.id && this.state.statusSelected == this.state.selectedRoomUpdate.status) {
            toast.error("vui lòng chọn thông tin bạn muốn thay đổi");
            return;
        }
        if (this.state.statusSelected !== "Đang hoạt động" && this.state.selectedRoomUpdate.status === "Đang hoạt động") {
            const roomId = this.state.selectedRoomUpdate.id;
            if (this.state.bookingRoomSelectedModel[roomId]) {
                toast.error(`không thể sửa bởi vì có người đang ở`);
                return;
            }
        }
        const response = await axios.put(`/room/${this.state.selectedRoomUpdate.id}`, {
            roomNumber: this.state.selectedRoomUpdate.roomNumber,
            roomTypeId: this.state.roomTypeSelected,
            status: this.state.statusSelected,
        });

        this.setState((prevState) => {
            const floorNumber = Math.floor(this.state.selectedRoomUpdate.roomNumber / 100);
            const updatedRooms = {
                ...prevState.rooms.grouped,
                [floorNumber]: prevState.rooms.grouped[floorNumber].map(room => room.id === this.state.selectedRoomUpdate.id ? response.result : room)
            };
            return { rooms: { grouped: updatedRooms } };
        });
        toast.success("Sửa phòng thành công");
        this.setState({ selectedRoomUpdate: null, roomTypeSelected: '', statusSelected: '' });
    }

    handleStatusChangeFilter = (status) => {
        if (status == this.state.statusSelectedFilter) {
            this.setState({ statusSelectedFilter: null });
        } else {
            this.setState({ statusSelectedFilter: status });
        }
    }

    render() {
        const { rooms, bookings, showModal, selectedRoom, bookingRoomDetailByRoomId, Option, selectedRoomUpdate, roomType, roomTypeSelected, statusSelected } = this.state;


        if (!selectedRoom) {
            return null;
        }

        return (
            <ProfileContainer>
                <DashboardContainer>

                    <div style={{ width: '100%' }}>
                        <Item>Rooms</Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ButtonCPN text="Hoạt động" onClick={() => { this.handleStatusChangeFilter("Đang hoạt động") }} style={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                                <ButtonCPN text="Đã đặt" onClick={() => { this.handleStatusChangeFilter("đã đặt") }} style={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                                <ButtonCPN text="Quá hạn" onClick={() => { this.handleStatusChangeFilter("quá hạn") }} style={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                                <ButtonCPN text="Bảo trì, sửa chữa" onClick={() => { this.handleStatusChangeFilter("bảo trì, sửa chữa") }} style={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ButtonCPN text="⚙️" onClick={() => { this.handleOption() }} style={{ width: 'auto', height: 'auto', fontSize: '13px', backgroundColor: '#5f5f5f', color: 'white' }} />

                            </div>
                        </div>

                    </div>

                </DashboardContainer>
                <div>
                    <InfiniteScroll
                        dataLength={this.state.totalRoom}
                        next={this.fetchRooms}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {rooms.grouped && Object.keys(rooms.grouped).map(floor => (
                            <div key={floor} style={{ marginTop: '20px' }}>
                                <Item style={{ paddingBottom: '10px', borderBottom: '1px solid #f8b600' }}>
                                    Tầng {floor}
                                </Item>
                                <RoomContainer>
                                    {rooms.grouped[floor]
                                        .filter((room) => {
                                            const booking = bookings[room.id];

                                            // Hiển thị tất cả phòng nếu không có bộ lọc
                                            if (!this.state.statusSelectedFilter) {
                                                return true;
                                            }

                                            // Hiển thị các phòng đã đặt
                                            if (this.state.statusSelectedFilter.toLowerCase() === "đã đặt") {
                                                const booking = bookings[room.id];

                                                if (!booking) {
                                                    // Nếu không có booking, loại phòng ra
                                                    return false;
                                                }

                                                const checkOutDate = new Date(booking.bookingRoom.checkOutDate);
                                                const today = new Date();

                                                // Chỉ hiển thị các phòng đã đặt nhưng chưa quá hạn
                                                return checkOutDate >= today;
                                            }

                                            // Hiển thị các phòng quá hạn
                                            if (this.state.statusSelectedFilter.toLowerCase() === "quá hạn") {
                                                if (booking) {
                                                    return new Date(booking.bookingRoom.checkOutDate) < new Date();
                                                }
                                                return false; // Nếu không có booking thì không phải quá hạn
                                            }

                                            // Hiển thị các phòng có trạng thái "Đang hoạt động"
                                            if (this.state.statusSelectedFilter.toLowerCase() === "đang hoạt động") {
                                                return room.status.toLowerCase() === "đang hoạt động";
                                            }
                                            if (this.state.statusSelectedFilter.toLowerCase() === "bảo trì, sửa chữa") {
                                                return room.status.toLowerCase() === "bảo trì" || room.status.toLowerCase() === "sửa chữa";
                                            }

                                            // Mặc định: không hiển thị
                                            return false;
                                        })
                                        .map((room) => {
                                            const booking = bookings[room.id];
                                            return (
                                                <RoomItem key={room.id} onClick={() => this.handleRoomClick(room)}>
                                                    <div>
                                                        <NameRoom>Phòng {room.roomNumber}</NameRoom>
                                                        <div style={{ marginTop: "10px" }}>
                                                            <TypeRoom>
                                                                Loại phòng: {room.roomType.name.replace(/room/i, "").trim()}
                                                            </TypeRoom>
                                                            <div style={{ marginTop: "10px" }}>
                                                                {booking ? (
                                                                    <>
                                                                        {/* Thông tin phòng đã đặt */}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div style={{ fontSize: "13px" }}>
                                                                            Giá: {room.roomType.price.toLocaleString()} VNĐ
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            {booking && (
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                    <div style={{ fontSize: "13px" }}>
                                                                        Check-in:{" "}
                                                                        {new Date(booking.bookingRoom.checkInDate)
                                                                            .toISOString()
                                                                            .split("T")[0]
                                                                            .split("-")
                                                                            .reverse()
                                                                            .join("/")}
                                                                    </div>
                                                                    <div style={{ fontSize: "13px" }}>
                                                                        Check-out:{" "}
                                                                        {new Date(booking.bookingRoom.checkOutDate)
                                                                            .toISOString()
                                                                            .split("T")[0]
                                                                            .split("-")
                                                                            .reverse()
                                                                            .join("/")}
                                                                    </div>
                                                                    <div style={{ fontSize: "14px" }}>
                                                                        Người đặt: {booking.bookingRoom.user.username}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {booking ? (
                                                            (() => {


                                                                if (
                                                                    new Date(booking.bookingRoom.checkInDate)
                                                                        .toISOString()
                                                                        .split("T")[0]
                                                                        .split("-")
                                                                        .reverse()
                                                                        .join("/") ===
                                                                    new Date(booking.bookingRoom.checkOutDate)
                                                                        .toISOString()
                                                                        .split("T")[0]
                                                                        .split("-")
                                                                        .reverse()
                                                                        .join("/")
                                                                ) {
                                                                    return new Date(booking.bookingRoom.checkOutDate) < new Date() ? (
                                                                        <StatusRoomBooked style={{ backgroundColor: "aqua" }}>
                                                                            {"quá hạn"}
                                                                        </StatusRoomBooked>
                                                                    ) : (
                                                                        <StatusRoomBooked style={{ backgroundColor: "#FFCCFF" }}>
                                                                            {"trong ngày"}
                                                                        </StatusRoomBooked>
                                                                    );
                                                                } else {
                                                                    return new Date(booking.bookingRoom.checkOutDate) < new Date() ? (
                                                                        <StatusRoomBooked style={{ backgroundColor: "aqua" }}>
                                                                            {"quá hạn"}
                                                                        </StatusRoomBooked>
                                                                    ) : (
                                                                        <StatusRoomBooked>
                                                                            {"đã đặt"}
                                                                        </StatusRoomBooked>
                                                                    );
                                                                }
                                                            })()
                                                        ) : (
                                                            <StatusRoomAvailable
                                                                style={{
                                                                    backgroundColor:
                                                                        room.status.toLowerCase() === "bảo trì"
                                                                            ? "yellow"
                                                                            : room.status.toLowerCase() === "sửa chữa"
                                                                                ? "red"
                                                                                : room.status.toLowerCase() === "đang hoạt động"
                                                                                    ? "#ccffcc"
                                                                                    : "#ccffcc",
                                                                }}
                                                            >
                                                                {room.status.replace(/^đang\s?/i, "").trim()}
                                                            </StatusRoomAvailable>
                                                        )}
                                                    </div>
                                                </RoomItem>
                                            );
                                        })}


                                </RoomContainer>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
                <ModalWrapper show={showModal} onHide={this.handleCloseModal} centered>
                    <ModalHeader closeButton>
                        <ModalTitle>Danh sách booking phòng {selectedRoom.roomNumber}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                position: "relative",
                                maxHeight: "700px",
                                overflowY: "auto",
                            }}
                        >
                            {bookingRoomDetailByRoomId[selectedRoom.id]?.map((bookingDetail, index) => (
                                <div
                                    key={bookingDetail.id}
                                    ref={(el) => (this.roomRefs[index] = el)}
                                    onClick={() => this.handleBookingRoomClick(bookingDetail)}
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        backgroundColor: this.state.bookingRoomSelectedModel[selectedRoom.id] === bookingDetail.id ? "#ffd700" : "#f9f9f9",
                                        position: "relative",
                                        transition: "background-color 0.3s ease",
                                    }}
                                >
                                    <div style={{ marginTop: "10px", color: "#333", fontSize: "14px" }}>
                                        <p><strong>Người đặt:</strong> {bookingDetail.bookingRoom.user.username}</p>
                                        <p><strong>Ngày check-in:</strong> {new Date(bookingDetail.bookingRoom.checkInDate).toLocaleString()}</p>
                                        <p><strong>Ngày check-out:</strong> {new Date(bookingDetail.bookingRoom.checkOutDate).toLocaleString()}</p>
                                    </div>
                                    {this.state.bookingRoomSelectedModel[selectedRoom.id] === bookingDetail.id && (
                                        <>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "-30px",
                                                    transform: "translateY(-50%)",
                                                    color: "#ff4500",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                ➤
                                            </div>
                                            <div style={{ marginTop: "10px", color: "#333", fontSize: "14px" }}>
                                                <p><strong>Chi tiết phòng:</strong> {bookingDetail.room.roomType.detail}</p>
                                                <p><strong>Giá:</strong> {bookingDetail.room.roomType.price.toLocaleString()} VND</p>
                                                <p><strong>Tổng tiền:</strong> {bookingDetail.bookingRoom.total.toLocaleString()} VND</p>
                                                <p><strong>Trạng thái thanh toán:</strong> {bookingDetail.bookingRoom.status}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                </ModalWrapper>

                <ModalWrapper show={Option} onHide={this.handleCloseModal} centered>
                    <ModalHeader closeButton>
                        <ModalTitle>Lựa chọn</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ display: this.state.addRoom ? 'none' : 'flex', flexDirection: 'column', gap: '15px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <SelectedRoom onChange={(event) => this.handleRoomSelect(event.target.value)} value={selectedRoomUpdate ? JSON.stringify(selectedRoomUpdate) : ""} >
                                    <option value="" disabled>Chọn phòng</option>
                                    {Object.keys(this.state.rooms.grouped).map(floor => (
                                        this.state.rooms.grouped[floor].map(room => (
                                            <option key={room.id} value={JSON.stringify(room)}>
                                                Phòng {room.roomNumber}
                                            </option>
                                        ))
                                    ))}
                                </SelectedRoom>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <SelectedRoom value={roomTypeSelected} onChange={this.handleRoomTypeChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                    <option value="" disabled>Chọn loại phòng</option>
                                    {roomType.map(roomType => (
                                        <option key={roomType.id} value={roomType.id}>
                                            {roomType.name}
                                        </option>
                                    ))}
                                </SelectedRoom>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <SelectedRoom value={statusSelected} onChange={this.handleStatusChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                    <option value="" disabled>Chọn trạng thái</option>
                                    <option value="sửa chữa">sửa chữa</option>
                                    <option value="bảo trì">bảo trì</option>
                                    <option value="Đang hoạt động">Đang hoạt động</option>
                                </SelectedRoom>
                            </div>
                        </div>
                        <div style={{ display: this.state.addRoom ? 'flex' : 'none', flexDirection: 'column', gap: '15px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <input type="number" placeholder="Nhập số phòng" onChange={(event) => this.setState({ roomNumberAdd: event.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <select onChange={(event) => this.setState({ roomTypeAdd: event.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                    <option value={this.state.selectedRoomUpdate?.roomType.id ?? ''} disabled selected>{this.state.selectedRoomUpdate?.roomType.name ?? 'chọn loại phòng'}</option>
                                    {this.state.roomType.map(roomType => (
                                        <option key={roomType.id} value={roomType.id} >
                                            {roomType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <select onChange={(event) => this.setState({ statusAdd: event.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                    <option value={this.state.selectedRoomUpdate?.status ?? ''} disabled selected>{this.state.selectedRoomUpdate?.status ?? 'chọn trạng thái'}</option>
                                    <option value="sửa chữa">sửa chữa</option>
                                    <option value="bảo trì">bảo trì</option>
                                    <option value="Đang hoạt động">Đang hoạt động</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                                <input type="number" placeholder="Nhập số ngày" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                            <ButtonCPN text="thêm" onClick={() => { this.handleAddRoom() }} style={{ width: 'auto', height: 'auto', fontSize: '13px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white' }} />
                            <ButtonCPN text="sửa" onClick={() => { this.handleUpdateRoom() }} style={{ width: 'auto', height: 'auto', fontSize: '13px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#2196F3', color: 'white' }} />
                            <ButtonCPN text="xóa" onClick={() => { this.handleDeleteRoom() }} style={{ width: 'auto', height: 'auto', fontSize: '13px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: 'white' }} />
                        </div>
                    </ModalBody>
                </ModalWrapper>
            </ProfileContainer>
        );
    }
};

export default Rooms;
