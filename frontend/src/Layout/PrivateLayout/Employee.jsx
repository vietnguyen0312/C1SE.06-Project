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



const handleEdit = (record) => {
    console.log('Edit user:', record);
};

const handleDelete = (record) => {
    console.log('Delete user:', record);
};

const Employee = () => {
    const [DsNhanVien, SetDsNhanVien] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
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
    const fetchData = async (page =1 ,pageSize=6, role="customer")=>{
        setLoading(false);
        const response = await axios.get('/users',{
            params:{page,pageSize,role, role}
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

    const handleAddCustomer = (values) => {
        console.log('New employee:', values);
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
            render: (id) => `${id.slice(0, 6)}...` 
        },
        {
            title: "Thông tin nhân viên",
            key: "userInfo",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={record.avatar}
                  alt="Avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
                />
                <span>{record.username}</span>
              </div>
            ),
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { 
            title: 'Mật khẩu', 
            dataIndex: 'password', 
            key: 'password',
            render: () => '*****'
        },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
        { 
            title: 'Action', 
            dataIndex: 'action', 
            key: 'action',
            render: (_, record) => (
                <Popover 
                    content={
                        <div>
                            <PopoverItem onClick={() => handleEdit(record)}>Edit</PopoverItem>
                            <PopoverItem onClick={() => handleDelete(record)}>Delete</PopoverItem>
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
            <ButtonCPN text="Thêm nhân viên" style={{marginBottom:'20px'}} onClick={()=> setShowAddEmployee(true)}/>
            {showAddEmployee && (
                <FormContainer>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Thêm mới nhân viên</div>
                <Form layout="vertical" onFinish={handleAddCustomer}>
                <Form.Item
                    label="Ảnh đại diện"
                    name="avatar"
                    rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện!' }]}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        accept="image/*"
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith("image/");
                            if (!isImage) {
                                message.error("Vui lòng tải lên tệp hình ảnh!");
                            }
                            return isImage || Upload.LIST_IGNORE;
                        }}
                        onChange={(info) => {
                            if (info.file.status === "done") {
                                message.success(`${info.file.name} đã tải lên thành công.`);
                            } else if (info.file.status === "error") {
                                message.error(`${info.file.name} tải lên thất bại.`);
                            }
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>
                    <Form.Item
                        label="Họ tên"
                        name="name"
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
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="maleFemale">Khác</Option>
                    </Select>
                    </Form.Item>
                    <div style={{display:'flex', gap:'20px'}}>
                        <ButtonCPN text="Thêm nhân viên" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                        <ButtonCPN text="Đóng" onClick={()=> {setShowAddEmployee(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
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
