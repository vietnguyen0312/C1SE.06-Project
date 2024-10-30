import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../Configuration/AxiosConfig';

const Container = styled.div`
    width: 70%;
    height: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
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
    width: 80%;
    max-width: 600px;
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
    margin: 10px 0;
    &:nth-child(2n) {
        background-color: #f1f1f1;
        padding: 8px;
        border-radius: 8px;
    }
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


    return (
        <Container>
            {checkCategory === 't' ? (
                <>
                    <Title className='Allison'>Checkout</Title>
                    <OrderContainer>
                        <SectionTitle>Thông tin đơn hàng</SectionTitle>
                        <InfoText>Mã đơn hàng: {billData.billInfo?.id}</InfoText>
                        <InfoText>Ngày đặt: {billData.billInfo?.datePay || billData.billInfo?.checkInDate}</InfoText>
                        <InfoText>Tổng tiền: {billData.billInfo?.total}</InfoText>
                        <InfoText>Trạng thái: {billData.billInfo?.status}</InfoText>
                    </OrderContainer>
                </>
            ) : (
                <>
                    <Title className='Allison'>Checkout</Title>
                    <OrderContainer>
                        <InfoText>Mã đơn hàng: {billData.billInfo?.id}</InfoText>
                        <InfoText>Ngày đặt: {billData.billInfo?.datePay || billData.billInfo?.checkInDate}</InfoText>
                        <InfoText>Tổng tiền: {billData.billInfo?.total}</InfoText>
                        <InfoText>Trạng thái: {billData.billInfo?.status}</InfoText>
                    </OrderContainer>
                </>
            )}
        </Container>
    );
};

export default Checkout;
