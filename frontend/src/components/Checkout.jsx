import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../Configuration/AxiosConfig';
import { CheckOutlined } from '@ant-design/icons';

const Container = styled.div`
    width: 70%;
    height: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Title = styled.h1`
    color: #f8b600;
    font-size: 80px;
    margin-bottom: 30px;
    text-align: center;
`;

const OrderContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    padding: 20px 30px;
`;

const SectionTitle = styled.h2`
    color: #343a40;
    font-size: 24px;
    border-bottom: 2px solid #f8b600;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const InfoText = styled.p`
    font-size: 18px;
    color: #555;
    line-height: 1.6;
    padding: 4px 8px;
    &:nth-child(2n) {
        background-color: #f1f1f1;
        padding: 4px 8px;
    }
`;

const Status = styled.span`
    color: #28a745;
`;

const Checkout = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderInfo = params.get('vnp_OrderInfo');
    const vnp_ResponseCode = params.get('vnp_ResponseCode');
    const [billData, setBillData] = useState({});
    const [checkCategory, setCheckCategory] = useState('');

    useEffect(() => {
        const fetchBillData = async () => {
            const category = orderInfo.charAt(0);
            setCheckCategory(category);
            const id = orderInfo.slice(1);

            if (vnp_ResponseCode === '00') {
                if (category === 't') {
                    const res = await axios.put(`/bill-ticket/${id}`, { status: 'Đã thanh toán' });
                    const detailsRes = await axios.get(`/bill-ticket-detail/get-by-bill/${id}`);
                    setBillData({
                        billInfo: res.result,
                        billDetails: detailsRes.result
                    });
                } else if (category === 'r') {
                    const res = await axios.put(`/booking_room/${id}`, { status: 'Đã thanh toán' });
                    const detailsRes = await axios.get(`/booking_room_details/byBookingRoom/${id}`);
                    setBillData({
                        billInfo: res.result,
                        billDetails: detailsRes.result
                    });
                }
            }
        };
        fetchBillData();
    }, [orderInfo, vnp_ResponseCode]);

    const Ticket1 = [
        { RoomNumber: 1, Startday: '10/2/2024', EndDay: '12/2/2024', price: 10000, status: 'Đã thanh toán' }
    ];

    return (
        <Container>
            {checkCategory === 't' ? (
                <>
                     {Ticket1.map(ticket => (
                        <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%'}} key={ticket.id}>
                                <Title className='Allison'>Checkout for room</Title>
                                <OrderContainer>
                                    <SectionTitle>Thông tin phòng</SectionTitle>
                                    <InfoText>Phòng số: {ticket.RoomNumber}</InfoText>
                                    <InfoText>Ngày bắt đầu: {ticket.Startday}</InfoText>
                                    <InfoText>Ngày kết thúc: {ticket.EndDay}</InfoText>
                                    <InfoText>Tổng tiền: {ticket.price.toLocaleString()} VNĐ</InfoText>
                                    <InfoText>Trạng thái: <Status>{ticket.status}</Status></InfoText>
                                </OrderContainer>
                        </div>
                    ))}
                </>
            ) : (
                <>
                   
                    <Title className='Allison'>Checkout for ticket</Title>
                    <OrderContainer>
                        <SectionTitle>Thông tin đơn hàng</SectionTitle>
                        <InfoText>Mã đơn hàng: {billData.billInfo?.id}</InfoText>
                        <InfoText>Ngày đặt: {billData.billInfo?.datePay || billData.billInfo?.checkInDate}</InfoText>
                        <InfoText>Tổng tiền: {billData.billInfo?.total.toLocaleString()} VNĐ</InfoText>
                        <InfoText>Trạng thái: <Status status={billData.billInfo?.status}>{billData.billInfo?.status}</Status></InfoText>
                    </OrderContainer>
                </>
            )}
        </Container>
    );
};

export default Checkout;
