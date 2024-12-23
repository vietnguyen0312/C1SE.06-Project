import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../Configuration/AxiosConfig';
import ButtonCPN from './Button/Button';

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-indexed
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        return ` 🕒 ${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s   📅 ${day} / ${month} / ${year}`;
    };

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
                    console.log(res.result, detailsRes.result);
                } else if (category === 'r') {
                    const bookingRoomIds = orderInfo.slice(1).split('%2C');
                    const updatePromises = bookingRoomIds.map(bookingRoomId =>
                        axios.put(`/booking_room/${bookingRoomId}`, { status: 'đã thanh toán' })
                    );
                    const updateResponses = await Promise.all(updatePromises);
                    const detailsRes = await axios.get(`/booking_room_details/byBookingRoom/${id}`);
                    setBillData({
                        billInfo: updateResponses.map(res => res.result),
                        billDetails: detailsRes.result
                    });
                }
            }
            if (category === 'v') {
                const getBill = await axios.get(`/booking_room_details/byBookingRoom/${id}`);
                setBillData({ billInfo: getBill.result[0].value[0].bookingRoom });
            }
        };
        fetchBillData();
    }, [orderInfo, vnp_ResponseCode]);

    return (
        <Container>
            <Title className='Allison'>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</Title>
            {checkCategory === 't' ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }} key={billData?.billInfo?.id}>
                    <OrderContainer>
                        <SectionTitle>Thông tin đơn hàng</SectionTitle>
                            <InfoText>Loại dịch vụ: {billData?.billDetails?.map(detail => detail.key.name).join(', ')}</InfoText>
                            <InfoText>Được tạo vào: {formatDate(billData?.billInfo?.dateCreated)}</InfoText>
                            <InfoText>Tổng tiền: {billData?.billInfo?.total.toLocaleString()} VNĐ</InfoText>
                            <InfoText>Trạng thái: <Status>{billData?.billInfo?.status}</Status></InfoText>
                        </OrderContainer>
                        <ButtonCPN text="Quay lại trang chủ" onClick={() => { window.location.href = '/'; }} />
                </div>
            ) : checkCategory === 'r' ? (
                <>
                    <OrderContainer>
                        <SectionTitle>Thông tin đơn hàng</SectionTitle>
                        {Array.isArray(billData.billInfo) ? (
                            <>
                                {billData.billInfo.slice(0, 2).map((order, index) => (
                                    <div key={index}>
                                        <InfoText>Mã đơn hàng {index + 1} : {order.id}</InfoText>
                                    </div>
                                ))}
                                <InfoText>Tổng tiền: {billData.billInfo.reduce((sum, order) => sum + order.total, 0).toLocaleString()} VNĐ</InfoText>
                                {billData.billInfo.length > 0 && (
                                    <div>
                                        <InfoText>Ngày đặt: {formatDate(billData.billInfo[0].datePay)}</InfoText>
                                        <InfoText>Trạng thái: <Status status={billData.billInfo[0].status}>{billData.billInfo[0].status}</Status></InfoText>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <InfoText>Mã đơn hàng: {billData.billInfo?.id}</InfoText>
                                <InfoText>Ngày đặt: {billData.billInfo?.datePay}</InfoText>
                                <InfoText>Tổng tiền: {billData.billInfo?.total.toLocaleString()} VNĐ</InfoText>
                                <InfoText>Trạng thái: <Status status={billData.billInfo?.status}>{billData.billInfo?.status}</Status></InfoText>
                            </div>
                        )}
                    </OrderContainer>
                    <ButtonCPN text="Quay lại trang chủ" onClick={() => { window.location.href = '/hotels'; }} />
                </>
            ) : checkCategory === 'v' ? (
                <>
                    <OrderContainer>
                        <div>
                            <SectionTitle>Thông tin đơn hàng</SectionTitle>
                            <InfoText>Mã đơn hàng: {billData.billInfo?.id}</InfoText>
                            <InfoText>Ngày đặt: {formatDate(billData.billInfo?.datePay)}</InfoText>
                            <InfoText>Tổng tiền: {billData.billInfo?.total.toLocaleString()} VNĐ</InfoText>
                            <InfoText>Trạng thái: <Status>{billData.billInfo?.status}</Status> </InfoText>
                        </div>
                    </OrderContainer>
                    <ButtonCPN text="Quay lại trang chủ" onClick={() => { window.location.href = '/manager/bookings'; }} />
                </>
            ) : null
            }
        </Container >
    );
};

export default Checkout;
