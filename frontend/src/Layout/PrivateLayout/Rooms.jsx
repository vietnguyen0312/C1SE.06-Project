import React, { Component } from 'react';
import styled from 'styled-components';
import { DashboardContainer, DateStyle } from './Dashboard';
import { RetweetOutlined } from '@ant-design/icons';
import axios from "../../Configuration/AxiosConfig";
import AOS from 'aos';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const Item = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const RoomItem = styled.div`
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
    font-size: 11px;
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
const RoomInfo = Array.from({ length: 30 }, (v, i) => ({
    id: i + 1,
    name: `Phong ${i + 1}`,
    type: i % 2 === 0 ? 'VIP' : 'Thường',
    numberPeople: i % 2 === 0 ? 1 : 2,
    numberRoom: i + 1,
    status: i % 3 === 0 ? 'Đã đặt' : 'Trống',
    date: '2024-11-15',
    price: 1000000,
    floor: Math.floor(i / 10) + 1,
}));

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: { grouped: {} },
            bookings: {},
            page: 1,
            totalPages: 1,
            totalRoom: 0,
            hasMore: true,
        };
    }

    componentDidMount() {
        AOS.init({ duration: 2000 });
        this.fetchRooms();
        this.fetchBookingRoomsDetail();
    }

    fetchBookingRoomsDetail = async () => {

        const response = await axios.get(`/booking_room_details/active`);
        const bookings = response.result.reduce((acc, bookingDetail) => {

            acc[bookingDetail.room.id] = bookingDetail;
            return acc;
        }, {});

        this.setState({ bookings });

    }

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


    render() {
        const { rooms, bookings } = this.state;
        return (
            <ProfileContainer>
                <DashboardContainer>
                    <div>
                        <Item>Rooms</Item>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <RetweetOutlined />
                        <DateStyle>Nov 9, 2024 - Nov 15, 2024</DateStyle>
                    </div>
                </DashboardContainer>
                {/* <div>
                    {[1, 2, 3].map(floor => (
                        <div key={floor} style={{ marginTop: '20px' }}>
                            <Item style={{ paddingBottom: '10px', borderBottom: '1px solid #f8b600' }}>Tầng {floor}</Item>
                            <RoomContainer>
                                {RoomInfo.filter(room => room.floor === floor).map((room) => (
                                    <RoomItem key={room.id}>
                                        <div>
                                            <NameRoom>Phòng {room.numberRoom}</NameRoom>
                                            <div style={{ marginTop: '10px' }}>
                                                <TypeRoom>Phòng: {room.type}</TypeRoom>
                                                {room.status === 'Đã đặt' && <TypeRoom>Số người: {room.numberPeople}</TypeRoom>}
                                                {room.status === 'Đã đặt' && <DateStyle>Ngày đặt: {room.date}</DateStyle>}
                                                <div style={{ marginTop: '10px' }}>Giá: {(room.price).toLocaleString()} VNĐ</div>
                                            </div>
                                        </div>
                                        <div>
                                            {room.status === 'Đã đặt' ? (
                                                <StatusRoomBooked>{room.status}</StatusRoomBooked>
                                            ) : (
                                                <StatusRoomAvailable>{room.status}</StatusRoomAvailable>
                                            )}
                                        </div>
                                    </RoomItem>
                                ))}
                            </RoomContainer>
                        </div>
                    ))}
                </div> */}

                <div>
                    <InfiniteScroll
                        dataLength={this.state.totalRoom}
                        next={this.fetchRooms}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                    // endMessage={<p style={{ textAlign: 'center' }}>All rooms loaded</p>}
                    >
                        {rooms.grouped && Object.keys(rooms.grouped).map(floor => (
                            <div key={floor} style={{ marginTop: '20px' }}>
                                <Item style={{ paddingBottom: '10px', borderBottom: '1px solid #f8b600' }}>
                                    Tầng {floor}
                                </Item>
                                <RoomContainer>
                                    {rooms.grouped[floor].map((room) => {
                                        const booking = bookings[room.id];
                                        return (
                                            <RoomItem key={room.id}>
                                                <div>
                                                    <NameRoom>Phòng {room.roomNumber}</NameRoom>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <TypeRoom>
                                                            Loại phòng: {room.roomType.name.replace(/room/i, '').trim()}
                                                        </TypeRoom>
                                                        <div style={{ marginTop: '10px' }}>
                                                            {booking ? (
                                                                <>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div style={{ fontSize: '13px' }}>Giá: {(room.roomType.price).toLocaleString()} VNĐ</div>
                                                                </>
                                                            )}
                                                        </div>
                                                        {booking && (
                                                            <>
                                                                <div style={{ fontSize: '13px' }}>
                                                                    Check-in: {new Date(booking.bookingRoom.checkInDate).toISOString().split('T')[0].split('-').reverse().join('/')}
                                                                </div>
                                                                <div style={{ fontSize: '13px' }}>
                                                                    Check-out: {new Date(booking.bookingRoom.checkOutDate).toISOString().split('T')[0].split('-').reverse().join('/')}
                                                                </div>
                                                                <div style={{ fontSize: '14px' }}>Người đặt: {booking.bookingRoom.user.username}</div>
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                                <div>
                                                    {booking ? (
                                                        // Kiểm tra xem ngày check-in và check-out có trùng nhau không
                                                        new Date(booking.bookingRoom.checkInDate).toISOString().split('T')[0].split('-').reverse().join('/') ===
                                                            new Date(booking.bookingRoom.checkOutDate).toISOString().split('T')[0].split('-').reverse().join('/') ? (
                                                            // Kiểm tra nếu check-out đã qua ngày hiện tại
                                                            new Date(booking.bookingRoom.checkOutDate) < new Date() ? (
                                                                <StatusRoomBooked style={{ backgroundColor: 'aqua' }}>
                                                                    {"quá hạn"}
                                                                </StatusRoomBooked>
                                                            ) : (
                                                                <StatusRoomBooked style={{ backgroundColor: '#FFCCFF' }}>
                                                                    {"trong ngày"}
                                                                </StatusRoomBooked>
                                                            )
                                                        ) : new Date(booking.bookingRoom.checkOutDate) < new Date() ? (
                                                            <StatusRoomBooked style={{ backgroundColor: 'aqua' }}>
                                                                {"quá hạn"}
                                                            </StatusRoomBooked>
                                                        ) : (
                                                            <StatusRoomBooked>
                                                                {"đã đặt"}
                                                            </StatusRoomBooked>
                                                        )
                                                    ) : (
                                                        <StatusRoomAvailable>
                                                            {room.status.replace(/^đang\s?/i, '').trim()}
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






            </ProfileContainer>
        );
    }
};

export default Rooms;
