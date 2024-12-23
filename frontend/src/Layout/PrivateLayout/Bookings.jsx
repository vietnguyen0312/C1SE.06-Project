import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardContainer, Header, HeaderItem, DateStyle } from './Dashboard';
import { RetweetOutlined } from '@ant-design/icons';
import ButtonCPN from '../../components/Button/Button';
import BookingRoom from '../../Service/BookingRoom';
import Ticket from '../../components/Ticket';
import CustomerCheckInCheckOut from './CustomerCheckInCheckOut/CustomerCheckInCheckOut';
import ConfirmTicket from '../../components/ConfirmTicket';

const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-top:50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BookingRoomContainer = styled.div`
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
`;
const Bookings = () => {
    const [showBookingRoom, setShowBookingRoom] = useState(false);
    const [showHistoryBookingRoom, setShowHistoryBookingRoom] = useState(true);
    const [showConfirmTicket, setShowConfirmTicket] = useState(false);
    const [showTicket, setShowTicket] = useState(true);
    const [searchTicket, setSearchTicket] = useState('');
    return (
        <ProfileContainer>
            <DashboardContainer>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Bookings</div>
                    <ButtonContainer>
                        <ButtonCPN
                            text='Tickets'
                            onClick={() => {
                                setShowTicket(true);
                                setShowConfirmTicket(false);
                                setShowBookingRoom(false);
                            }}
                            style={{ 
                                width: '100px', height: '40px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',marginRight: '10px',
                                backgroundColor: showTicket ? 'black' : '#f8b600',
                            }}
                        />
                        <ButtonCPN
                            text='Rooms'
                            onClick={() => {
                                setShowBookingRoom(true);
                                setShowTicket(false);
                                setShowConfirmTicket(false);
                            }}
                            style={{ 
                                width: '100px', height: '40px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: showBookingRoom ? 'black' : '#f8b600',
                            }}
                        />
                    </ButtonContainer>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RetweetOutlined />
                    <DateStyle>Nov 9, 2024 - Nov 15, 2024</DateStyle>
                </div>
            </DashboardContainer>

            {showBookingRoom && (
                <>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ButtonContainer>
                                <ButtonCPN
                                    text="Đặt phòng"
                                    onClick={() => { setShowHistoryBookingRoom(true) }}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        fontSize: '13px',
                                        backgroundColor: showHistoryBookingRoom ? 'green' : '#f8b600', // Đổi màu dựa trên điều kiện
                                        color: 'white'
                                    }}
                                />
                            </ButtonContainer>
                            <ButtonContainer>
                                <ButtonCPN
                                    text="Check-in/Check-out"
                                    onClick={() => { setShowHistoryBookingRoom(false) }}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        fontSize: '13px',
                                        backgroundColor: showHistoryBookingRoom ? '#f8b600' : 'green', // Đổi màu dựa trên điều kiện
                                        color: 'white'
                                    }}
                                />
                            </ButtonContainer>
                        </div>
                        {showHistoryBookingRoom && (
                            <BookingRoomContainer>
                                <BookingRoom showBanner={false} />
                            </BookingRoomContainer>
                        )}

                        {showHistoryBookingRoom == false && (
                            <CustomerCheckInCheckOut />
                        )}
                    </div>
                </>
            )}
            {showTicket && (
                <>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ButtonContainer>
                                    <ButtonCPN
                                        text="Đặt vé"
                                        onClick={() => { setShowConfirmTicket(false) }}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                            fontSize: '13px',
                                            backgroundColor: showConfirmTicket ? '#f8b600' : 'green', // Đổi màu dựa trên điều kiện
                                            color: 'white'
                                        }}
                                    />
                                </ButtonContainer>
                                <ButtonContainer>
                                    <ButtonCPN
                                        text="Xác nhận vé"
                                        onClick={() => { setShowConfirmTicket(true) }}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                            fontSize: '13px',
                                            backgroundColor: showConfirmTicket ? 'green' : '#f8b600', // Đổi màu dựa trên điều kiện
                                            color: 'white'
                                        }}
                                    />
                                </ButtonContainer>
                                {showConfirmTicket && (
                                    <SearchInput placeholder="Tìm kiếm" onChange={(e) => setSearchTicket(e.target.value)} />
                                )}
                            </div>
                            {showConfirmTicket && (
                                <ConfirmTicket search={searchTicket} />
                            )}
                            {!showConfirmTicket && (
                                <Ticket style={{ padding: '0' }} />
                            )}
                        </div>
                    </div>                    
                    </>
                )}
        </ProfileContainer>
    );
};

export default Bookings;
