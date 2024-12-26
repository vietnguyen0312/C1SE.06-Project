import styled from "styled-components";
import axios from '../Configuration/AxiosConfig'; 
import { useEffect, useState } from "react";
import { Form, Input, Select, Modal, message, Table } from 'antd';
import React from 'react';
import ButtonCPN from './Button/Button';

const ButtonContainer = styled.div`
    top: 120px;
    right: 20px;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
`;

const FormContainer = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TicketUpdate = ({serviceId}) => {
    const [showAddTicket, setShowAddTicket] = useState(false);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [editingTicket, setEditingTicket] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchTicketTypes();
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [serviceId]);

    const fetchTickets = async () => {
        const response = await axios.get(`/tickets/getByIdService/${serviceId}`);
        setTickets(response.result.value);
    }

    const fetchTicketTypes = async () => {
        const response = await axios.get(`/ticket-types`);
        setTicketTypes(response.result);
    }

    const handleAddTicket = async (values) => {
        const requestBody = {
            serviceId: serviceId,
            price: values.price,
            quantity: values.quantity,
            ticketTypeId: values.ticketTypeId
        };
        
        const response = await axios.post(`/tickets`, requestBody);
        setTickets([...tickets, response.result]);
        setShowAddTicket(false);
        message.success('Thêm loại vé thành công');
    }

    const handleEditTicket = (ticket) => {
        setEditingTicket(ticket);
        setShowEditModal(true);
    };

    const handleUpdateTicket = async (values) => {
        const requestBody = {
            price: values.price,
            quantity: values.quantity,
            ticketTypeId: values.ticketTypeId,
            status: editingTicket.status
        };
        const response = await axios.put(`/tickets/${editingTicket.id}`, requestBody);
        setTickets(tickets.map(ticket => ticket.id === editingTicket.id ? response.result : ticket));
        message.success('Cập nhật vé thành công!');
        setShowEditModal(false);
    };

    const TicketColumns = [
        { title: "ID",render: (record) => `${record.id.slice(0, 6)}...`},
        {
            title: "Thông tin dịch vụ",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={record.serviceEntity.image}
                  alt="Avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
                />
                <div style={{maxWidth:'200px'}}>{record.serviceEntity.name}</div>
              </div>
            ),
        },
        { title: 'Loại vé',
            render: (record)=>{
                return <div style={{display: "flex", alignItems: "center"}}>{record.ticketType.name}</div>
            }
        },
        { title: 'Số lượng', 
            render: (record)=>{
                return <div>{record.quantity}</div>
            }
        },
        { title: 'Đơn giá',
            render: (record)=>{
                return <div>{record.price.toLocaleString('vi-VN',{style:'currency',currency:'VND'})} </div>
            }
        },
        { title: '',
            render: (record) => {
                return (
                    <>
                        <ButtonCPN text="Sửa" onClick={() => handleEditTicket(record)} style={{width:'100px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}/>
                    </>
                );
            }
        },
    ];

    return (
        <>
            {showEditModal && (
                <Modal
                    title="Cập nhật vé"
                    visible={showEditModal}
                    onCancel={() => setShowEditModal(false)}
                    footer={null}
                >
                    <Form
                        layout="vertical"
                        initialValues={editingTicket}
                        onFinish={handleUpdateTicket}
                    >
                        <Form.Item
                            label="Giá (VND)"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <Input type="number" placeholder="Nhập số tiền" />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số lượng!' },
                                { validator: (_, value) => value > 1 ? Promise.resolve() : Promise.reject('Số lượng phải lớn hơn 1!') }
                            ]}
                        >
                            <Input type="number" placeholder="Nhập số lượng" />
                        </Form.Item>
                        <ButtonCPN text="Cập nhật" type="primary" htmlType="submit" style={{width:'100%', height:'40px'}}/>
                    </Form>
                </Modal>
            )}

            <Table
                dataSource={tickets}
                columns={TicketColumns}
                pagination={false}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'20px' }}>
                <ButtonContainer>
                    <ButtonCPN text="Thêm loại vé" style={{marginBottom:'20px'}} onClick={()=>setShowAddTicket(true)}></ButtonCPN>
                </ButtonContainer>
            </div>

            {showAddTicket && (
                <FormContainer>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Thêm mới loại vé</div>
                    <Form layout="vertical" onFinish={handleAddTicket}>
                        <Form.Item
                            label="Giá (VND)"
                            name="price"
                            rules={[
                                { required: true, message: 'Vui lòng nhập giá!' },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập số tiền" />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số lượng!' },
                                { validator: (_, value) => value > 1 ? Promise.resolve() : Promise.reject('Số lượng phải lớn hơn 1!') }
                            ]}
                        >
                            <Input type="number" placeholder="Nhập số lượng" />
                        </Form.Item>
                        <Form.Item
                            label="Chọn loại vé"
                            name="ticketTypeId"
                            rules={[{ required: true, message: 'Vui lòng chọn loại vé!' }]}
                        >
                        <Select placeholder="Chọn loại vé">
                            {ticketTypes
                                .filter(type => !tickets.some(ticket => ticket.ticketType.id === type.id))
                                .map((type) => (
                                    <Option value={type.id}>{type.name}</Option>
                                ))}
                        </Select>
                        </Form.Item>
                        <div style={{display:'flex', gap:'20px'}}>
                            <ButtonCPN text="Thêm loại vé" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                            <ButtonCPN text="Đóng" onClick={()=> {setShowAddTicket(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
                        </div>
                    </Form>
                </FormContainer>
            )}
        </>
    )
}

export default TicketUpdate;
