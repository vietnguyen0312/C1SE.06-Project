import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Input } from 'antd';
import axios from "../Configuration/AxiosConfig";
import { EyeOutlined } from '@ant-design/icons';

const ConfirmTicket = ({ search }) => {
    const [billTicket, setBillTicket] = useState([]);
    const [ticketQuantityConfirm, setTicketQuantityConfirm] = useState(0);
    const [showDetail, setShowDetail] = useState(false);
    const [billTicketDetail, setBillTicketDetail] = useState([]);
    
    useEffect(() => {
        fetchBillTicket(1,6,search);
    }, [search]);

    const ServiceDetailColumns = [
        { title: "ID",render: (record) => `${record.id.slice(0, 6)}...`},
        {
            title: "Thông tin dịch vụ",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={record.ticket.serviceEntity.image}
                  alt="Avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
                />
                <div style={{maxWidth:'200px'}}>{record.ticket.serviceEntity.name}</div>
              </div>
            ),
        },
        { title: 'Loại vé',
            render: (record)=>{
                return <div style={{display: "flex", alignItems: "center"}}>{record.ticket.ticketType.name}</div>
            }
        },
        { title: 'Số vé chưa sử dụng', 
            render: (record)=>{
                const ticketQuantityUsed = record.status.toLowerCase().includes('đã sử dụng') ? parseInt(record.status.split(' ')[3]) : 0;
                return <div>{record.quantity - ticketQuantityUsed}</div>
            }
        },
        { title: 'Đơn giá',
            render: (record)=>{
                return <div>{record.ticket.price.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
            }
        },
        { title: 'Thành tiền', dataIndex: 'total', key: 'total', sorter: (a, b) => a.total - b.total,
            render: (total)=>{
                return <div>{total ? total.toLocaleString('vi-VN',{style:'currency',currency:'VND'}) : 0}</div>
            }
        },
        { title: 'Tình trạng', dataIndex: 'status', key: 'status',
            render: (status)=>{
                return <div style={{fontWeight:'bold'}}>{status}</div>
            }
        },
        { title: '',
            render: (record) => {
                const ticketQuantityAvailable = record.quantity - (record.status.toLowerCase().includes('đã sử dụng') ? parseInt(record.status.split(' ')[3]) : 0);
                if ((ticketQuantityAvailable > 0 && record.billTicket.status.toLowerCase().includes('đã thanh toán')) && !record.status.toLowerCase().includes('Đã đánh giá')) {
                    return (
                        <div>
                            {ticketQuantityAvailable > 1 && (
                                <Input
                                    defaultValue={1}
                                    type='number'
                                    min={1}
                                    max={ticketQuantityAvailable}
                                    onChange={(e) => {
                                        if(e.target.value > ticketQuantityAvailable || e.target.value < 1){
                                            alert('Số lượng không phù hợp');
                                            setTicketQuantityConfirm(1);
                                        } else {
                                            setTicketQuantityConfirm(e.target.value);
                                        }
                                    }}
                                    placeholder="Nhập SL vé"
                                    style={{ width: '100px', marginRight: '10px' }}
                                />
                            )}
                            <Button onClick={() => handleConfirm(record)}>Xác nhận</Button>
                        </div>
                    );
                } else {
                    return null;
                }
            }
        },
    ];

    const columnsTicket = [
        { title: "ID",render: (record) => `${record.id.slice(0, 6)}...`},
        { title: "Thông tin khách hàng",render: (record) =>
             <div style={{ display: "flex", alignItems: "center" }}>
                <img src={record.user?.avatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }} />
                <span>{record.user?.username}</span>
            </div> 
        },
        { title: "Số điện thoại", render: (record) => record.user.phoneNumber },
        { title: "Loại khách hàng", render: (record) => Array.isArray(record.user.customerType) ? record.user.customerType.map((type) => type.name).join(", ") : record.user.customerType?.name || "N/A" },
        { title: "Ngày đặt", render: (record) => {
            const date = new Date(record.dateCreated);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }},
        {title:'Tổng tiền',render:(record)=>record.total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})},
        { 
            title: "Trạng thái", 
            render: (record) => {
                let color;
                switch (record.status.toLowerCase()) {
                    case 'đã thanh toán':
                        color = 'green';
                        break;
                    case 'đã huỷ':
                        color = 'red';
                        break;
                    case 'chưa thanh toán':
                        color = 'orange';
                        break;
                    default:
                        color = 'black';
                }
                return <span style={{ color, fontWeight: 'bold' }}>{record.status.toUpperCase()}</span>;
            }
        },
        { 
            title: 'Chi tiết',
            render: (record) => (
                <div 
                    style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center', display: 'flex' }}
                >
                    <EyeOutlined 
                        onClick={ async () => {
                            const response = await fetchSelectedBillTicketDetail(record);
                            if (response) {
                                setTicketQuantityConfirm(0);
                                setShowDetail(true);
                            }
                        }}/>
                </div>
            ),
        },
    ];

    const handleConfirm = async (billTicketItem) => {
        const ticketQuantityUsed = (parseInt(billTicketItem.status.split(' ')[3])) ? parseInt(billTicketItem.status.split(' ')[3]) : 0;
        if(ticketQuantityConfirm < 0 || ticketQuantityConfirm > billTicketItem.quantity - ticketQuantityUsed){
            alert('Số lượng không phù hợp');
            setTicketQuantityConfirm(1);
        } else {
            Modal.confirm({
                  title: "Xác nhận",
                  content: "Bạn có chắc chắn muốn xác nhận không?",
                  onOk: async () => {
                    let response;
                    if(billTicketItem.billTicket.status.toLowerCase().includes('đã thanh toán')){
                        
                        if(ticketQuantityConfirm === 0){
                            response = await axios.put(`/bill-ticket-detail/${billTicketItem.id}`,{
                                status: 'Đã sử dụng ' + (ticketQuantityUsed + 1).toString(),
                            }).result;
                        } else {
                            response = await axios.put(`/bill-ticket-detail/${billTicketItem.id}`,{
                                status: 'Đã sử dụng ' + (ticketQuantityUsed + parseInt(ticketQuantityConfirm)).toString(),
                            }).result;
                        }
                    } 
                    else{
                        if(ticketQuantityConfirm === 0){
                            response = await axios.put(`/bill-ticket-detail/${billTicketItem.id}`,{
                                status: 'Đã sử dụng 1',
                            }).result;
                        } else if(ticketQuantityConfirm > 0){
                            response = await axios.put(`/bill-ticket-detail/${billTicketItem.id}`,{
                                status: 'Đã sử dụng ' + ticketQuantityConfirm,
                            }).result;
                        }
                    }
                    setShowDetail(false);
                    setTicketQuantityConfirm(0);
                    Modal.success({
                        title: 'Thành công',
                        content: 'Xác nhận vé thành công',
                        okButtonProps: {
                            style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
                        },
                    });
                },
                okButtonProps: {
                style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
                },
            });
        }
    }
    
    const fetchBillTicket = async (page,pageSize,search) =>{
        const billTicket = await axios.get('/bill-ticket',{
            params:{
                page,
                pageSize,
                search
            }
        })
        setBillTicket(billTicket.result);
    }

    const fetchSelectedBillTicketDetail = async (bill) => {
        const response = await axios.get(`/bill-ticket-detail/get-by-bill-simple/${bill.id}`);
        setBillTicketDetail(response.result);
        return response.result;
    }

    return (
        <>
            <div style={{ padding: '20px' }}>
                {!showDetail ? (
                <Table
                    dataSource={billTicket.data}
                    columns={columnsTicket}
                    pagination={{
                        pageSize: billTicket.pageSize,
                        current: billTicket.currentPage,
                        total: billTicket.totalElements
                    }}
                    onChange={(pagination) =>
                        fetchBillTicket(pagination.current, pagination.pageSize)
                    }
                />
                ) : (
                    <>
                        <Table
                            dataSource={billTicketDetail}
                            columns={ServiceDetailColumns}
                            pagination={false}
                        />
                        <Button style={{marginTop:'10px'}} onClick={() => {
                            setShowDetail(false);
                        }}>Quay lại</Button>
                    </>
                )}
            </div>
        </>
    )
}

export default ConfirmTicket;
