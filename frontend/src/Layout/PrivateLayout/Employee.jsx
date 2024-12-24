import React, { useState, useEffect } from 'react';
import axios from '../../Configuration/AxiosConfig';
import { Table, Popover, Spin, Form, Input, Select, Upload, Modal } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ButtonCPN from '../../components/Button/Button'

const PopoverItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: #f8b600;
    }
`;

const EmployeeContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const Employee = () => {
    const [DsNhanVien, SetDsNhanVien] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddUser, setShowAddUser] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total:0,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
      const [modalContent, setModalContent] = useState(null);
      const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    
      const showModal = (content) => {
        setModalContent(content);
        setIsModalVisible(true);
      };
    const fetchData = async (page =1 ,pageSize=6, role="employee")=>{
        setLoading(false);
        const response = await axios.get('/users',{
            params:{page,pageSize,role}
        })            
        SetDsNhanVien(response.result.data)
        setPagination({
            current: response.result.currentPage,
            pageSize: response.result.pageSize,
            total: response.result.totalElements,
        })
    }
    useEffect(()=>{
        fetchData(pagination.current, pagination.pageSize)
    },[])

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
    };
   

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    const FormContainer = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;
    const updateUserStatus = async (id, status, userData) => {
        const response = await axios.put(`/users/${id}`,{
            ...userData,
            status: status,
        })
    }
    const handleBanUser = (record) => {
        Modal.confirm({
          title: "Xác nhận",
          content: "Cấm người dùng này không?",
          onOk: async () => {
            await updateUserStatus(record.id, "BAN", record);
            fetchData(pagination.current, pagination.pageSize);
          },
          okButtonProps: {
            style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
          },
        });
      };
      
    const handleAddUser = async (values) => {
        const response = await axios.post('/users/create-employee',{
            ...values,
        });
        fetchData(pagination.current, pagination.pageSize);
        setShowAddUser(false);
        Modal.success({
            title: 'Thành công',
            content: 'Thêm nhân viên mới thành công',
            okButtonProps: {
                style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
            },
        });
    };
    const handleEdit = (record) => {
        console.log('Edit user:', record);
        showModal(record); 
    };
    
    const columns = [
        { 
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id',
            render: (id, record) => (
                <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
                  {id.slice(0, 6)}...
                </span>
              ),
        },
        {
            title: "Thông tin nhân viên",
            key: "userInfo",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center", opacity: record.status === "BAN" ? 0.5 : 1 }}>
                <img
                  src={record.avatar}
                  alt="Avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
                />
                <span>{record.username}</span>
              </div>
            ),
        },
        { title: 'Email', 
            render: (record) => (
                <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
                  {record.email}
                </span>
              ),
        },
        { 
            title: 'Mật khẩu', 
            dataIndex: 'password', 
            key: 'password',
            render: () => '*****'
        },
        { title: 'Số điện thoại', 
            render: (record) => (
                <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
                  {record.phoneNumber || "N/A"}
                </span>
              ),
        },
        { title: 'Giới tính', 
            render: (record) => (
                <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
                  {record.gender || "N/A"}
                </span>
              ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status, record) => (
              <span style={{ 
                opacity: record.status === "BAN" ? 0.5 : 1,
                color: status === "BAN" ? "#ff0004" : "#52c41a",
                fontWeight: '600'
              }}>
                {status === "BAN" ? "Dừng hoạt động" : "Đang hoạt động"}
              </span>
            ),
        },
        { 
            title: 'Action', 
            dataIndex: 'action', 
            key: 'action',
            render: (_, record) => (
                <Popover 
                    content={
                        <div>
                            <PopoverItem onClick={() => handleEdit(record)}>Edit</PopoverItem>
                            <PopoverItem
                                onClick={() => handleBanUser(record)}
                                style={{
                                    pointerEvents: record.status === "BAN" ? "none" : "auto",
                                    opacity: record.status === "BAN" ? 0.5 : 1,
                                }}
                                >
                                Set ban
                            </PopoverItem>
                        </div>
                    } 
                    trigger="click" 
                    placement="left"
                >
                    <div style={{ cursor: 'pointer', fontSize: '20px', color: '#3518f0' }}>
                        <SettingOutlined />
                    </div>
                </Popover>
            ),
        },
    ];
    return (
        <EmployeeContainer>
            <ButtonCPN text="Thêm nhân viên" style={{marginBottom:'20px'}} onClick={()=> setShowAddUser(true)}/>
            {showAddUser && (
                <FormContainer>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Thêm mới nhân viên</div>
                <Form layout="vertical" onFinish={handleAddUser}>
                    <Form.Item
                        label="Họ tên"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                    <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                    >
                    <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                    <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                    <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                    <Select placeholder="Chọn giới tính">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                    </Form.Item>
                    <div style={{display:'flex', gap:'20px'}}>
                        <ButtonCPN text="Thêm nhân viên" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                        <ButtonCPN text="Đóng" onClick={()=> {setShowAddUser(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
                    </div>
                </Form>
            </FormContainer>
            )}
            
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Danh sách nhân viên</div>
            <Table
                dataSource={DsNhanVien}
                columns={columns}
                pagination={{
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    total: pagination.total,
                }}
                rowKey='id'
                onChange={handleTableChange}
            />
            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={modalSize.width}
                height={modalSize.height}
            >
            <div>
            {modalContent && (
                <FormContainer>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Chỉnh sửa thông tin nhân viên</div>
                    <Form layout="vertical" >
                    <Form.Item
                        label="Họ tên nhân viên"
                        name="name"
                    >
                    <Input placeholder="Nhập họ tên nhân viên" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                    <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                    >
                    <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                    >
                    <Select placeholder="Chọn giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="maleFemale">Khác</Option>
                    </Select>
                    </Form.Item>
                    <div style={{display:'flex', gap:'20px'}}>
                        <ButtonCPN text="Edit" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                        <ButtonCPN text="Đóng" onClick={()=>{setIsModalVisible(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
                    </div>
                    </Form>
                </FormContainer>
                )}
            </div>
            </Modal>
        </EmployeeContainer>
    );
};

export default Employee;