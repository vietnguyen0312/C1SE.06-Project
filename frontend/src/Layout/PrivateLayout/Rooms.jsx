import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardContainer, Header, HeaderItem, DateStyle } from './Dashboard';
import { RetweetOutlined } from '@ant-design/icons';
import ButtonCPN from '../../components/Button/Button';


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
    font-size: 16px;
    color: #888;
`;
const StatusRoomBooked = styled.div`
    font-size: 16px;
    background-color: #ffcccc; 
    padding: 10px;
    border-radius: 10px;
`;
const StatusRoomAvailable = styled.div`
    font-size: 16px;
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

const Rooms = () => {

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
            <div>
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
            </div>

        </ProfileContainer>
    );
};

export default Rooms;
