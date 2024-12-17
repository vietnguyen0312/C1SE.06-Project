import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonCPN from '../../../components/Button/Button';
import { NameRoom, TypeRoom, StatusRoomBooked, StatusRoomAvailable } from '../Rooms';
import { Checkbox } from 'antd';

const RoomItem = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 220px;
    width: 270px;
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

const CustomerCheckInCheckOut = () => {
    const [showRoom, setShowRoom] = useState(false);

    const [roomStatus, setRoomStatus] = useState("hoạt động");

    const handleSearch = () => {
        setShowRoom(true);
        const isRoomExpired = Math.random() > 0.5; 
        setRoomStatus(isRoomExpired ? "quá hạn" : "hoạt động");
    };

    return (
        <InputContainer>
            <SearchContainer>
                <SearchInput placeholder="Id booking room" />
                <SearchInput placeholder="Nhập email" />
                <SearchInput placeholder="Nhập số điện thoại" />
            </SearchContainer>
            <ButtonCPN
                text="Tìm kiếm"
                style={{ width: '200px' }}
                onClick={handleSearch}
            />
            {showRoom && (
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
                            <div style={{marginTop:'5px'}}>
                                Giá: 1,200,000 VND
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div style={{  display: 'flex', justifyContent: 'space-between' }}>
                        <Checkbox>Check in</Checkbox>
                        <Checkbox>Check out</Checkbox>
                    </div>
                </RoomItem>
            )}
        </InputContainer>
    );
};

export default CustomerCheckInCheckOut;
