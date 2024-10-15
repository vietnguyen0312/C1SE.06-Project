import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../Configuration/AxiosConfig';

const Checkout = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderInfo = params.get('vnp_OrderInfo');
    const [billData, setBillData] = useState({});

    useEffect(() => {
        const fetchBillData = async () => {
            const checkCategory = orderInfo.charAt(0);
            const id = orderInfo.slice(1);
            if (checkCategory === 't') {
                const res = await axios.put(`/bill-ticket/${id}`, { status: 'Đã thanh toán' });
                const detailsRes = await axios.get(`/bill-ticket-detail/get-by-bill/${id}`);
                setBillData({
                    billInfo: res.result,
                    billDetails: detailsRes.result
                });
            }
        };
        fetchBillData();
    }, [orderInfo]);

    return (
        <div>
            <h1>Checkout</h1>
            <div>
                <h2>Thông tin đơn hàng</h2>
                <p>Mã đơn hàng: {billData.billInfo?.id}</p>
                <p>Ngày đặt: {billData.billInfo?.datePay}</p>
                <p>Tổng tiền: {billData.billInfo?.total}</p>
                <p>Trạng thái: {billData.billInfo?.status}</p>
            </div>
        </div>
    )
}

export default Checkout;
