import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardContainer, Header, HeaderItem, DateStyle } from './Dashboard';
import { RetweetOutlined } from '@ant-design/icons';
import ButtonCPN from '../../components/Button/Button';
import BookingRoom from '../../Service/BookingRoom';
import HistoryBookingRoom from '../../Layout/PublicLayout/HistoryBill/HistoryBookingRoom';
import HistoryTicketBill from '../../Service/HistoryTicketBill';
import Ticket from '../../components/Ticket';

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
    const [showHistoryBookingRoom, setShowHistoryBookingRoom] = useState(false);
    const [showHistoryTicketBill, setShowHistoryTicketBill] = useState(false);
    const [showTicket, setShowTicket] = useState(true);
    const [showSearch, setShowSearch] = useState(false);

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
                                setShowHistoryTicketBill(!showHistoryTicketBill);
                                setShowSearch(true);
                                setShowBookingRoom(false);
                                //setShowHistoryBookingRoom(false);
                            }}
                            style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}
                        />
                        <ButtonCPN
                            text='Rooms'
                            onClick={() => {
                                setShowBookingRoom(true);
                                //setShowHistoryBookingRoom(!showHistoryBookingRoom);
                                setShowSearch(true);
                                setShowTicket(false);
                                setShowHistoryTicketBill(false);
                            }}
                            style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        />
                    </ButtonContainer>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RetweetOutlined />
                    <DateStyle>Nov 9, 2024 - Nov 15, 2024</DateStyle>
                </div>
            </DashboardContainer>
            {showBookingRoom && (
                <BookingRoomContainer>
                    <BookingRoom showBanner={false} />
                </BookingRoomContainer>
            )}
            <div style={{ marginTop: '20px' }}>
                {showTicket && <Ticket style={{ padding: '0' }} />}
            </div>
            {showSearch && (
                <InputContainer>
                    <SearchInput type="text" placeholder="Tìm kiếm ..." />
                </InputContainer>
            )}
            {/* <div >
                {showHistoryBookingRoom && <HistoryBookingRoom />}
            </div> */}
            <div>
                {showHistoryTicketBill && <HistoryTicketBill />}
            </div>
        </ProfileContainer>
    );
};

export default Bookings;
