import React, { useState, useEffect } from 'react';
import axios from '../../Configuration/AxiosConfig';
import { Table, Popover, Spin, Form, Input, Select, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ButtonCPN from '../../components/Button/Button'
import { debounce } from 'lodash';
const { Search } = Input;
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

const Manager = () => {
    const [search, setSearch] = useState("");
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
    const fetchData = async (page =1 ,pageSize=6, role="manager", search="")=>{
        setLoading(false);
        const response = await axios.get('/users',{
            params:{page,pageSize,role,search}
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
    
    const handleUnbanUser = (record) => {
        Modal.confirm({
          title: "Xác nhận",
          content: "Gỡ bỏ cấm người dùng này?",
          onOk: async () => {
            await updateUserStatus(record.id, "Đang hoạt động", record);
            fetchData(pagination.current, pagination.pageSize);
          },
          okButtonProps: {
            style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
          },
        });
    };

    const handleAddUser = async (values) => {
      const response = await axios.post('/users/create-manager',{
          ...values,
      });
      fetchData(pagination.current, pagination.pageSize);
      setShowAddUser(false);
      Modal.success({
          title: 'Thành công',
          content: 'Thêm quản lý mới thành công',
          okButtonProps: {
              style: { backgroundColor: '#f8b600', borderColor: '#f8b600' },
          },
      });
    };
    
    const handleSearch = debounce((value) => {
        setSearch(value);
        fetchData(pagination.current, pagination.pageSize, "manager", value);
    }, 300);
    
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
            title: "Thông tin quản lý",
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
                  {record.phoneNumber}
                </span>
              ),
        },
        { title: 'Giới tính', 
            render: (record) => (
                <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
                  {record.gender}
                </span>
              ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status, record) => (
              <span style={{ 
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
                            <PopoverItem
                                onClick={() => handleUnbanUser(record)}
                                style={{
                                    pointerEvents: record.status === "Đang hoạt động" ? "none" : "auto",
                                    opacity: record.status === "Đang hoạt động" ? 0.5 : 1,
                                }}>Gỡ bỏ cấm
                            </PopoverItem>
                            <PopoverItem
                                onClick={() => handleBanUser(record)}
                                style={{
                                    pointerEvents: record.status === "BAN" ? "none" : "auto",
                                    opacity: record.status === "BAN" ? 0.5 : 1,
                                }}>Cấm người dùng
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
            <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                <ButtonCPN text="Thêm quản lý" style={{marginBottom:'20px'}} onClick={()=> setShowAddUser(true)}/>
                <Search
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    onChange={(e) => handleSearch(e.target.value)}
                    allowClear
                    style={{ marginBottom: "20px", width:'300px' }}
                />
            </div>

            
            {showAddUser && (
                <FormContainer>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Thêm mới quản lý</div>
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
                      <ButtonCPN text="Thêm quản lý" type="primary" htmlType="submit" style={{width:'170px', height:'50px',fontSize:'14px'}}/>
                      <ButtonCPN text="Đóng" onClick={()=> {setShowAddUser(false)}} style={{width:'170px', height:'50px',fontSize:'14px', backgroundColor:'#ababaa'}}/>
                  </div>
                </Form>
            </FormContainer>
            )}
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Danh sách quản lý</div>
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
            </Modal>
        </EmployeeContainer>
    );
};

export default Manager;