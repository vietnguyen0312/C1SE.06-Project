import React, { useState, useEffect } from "react";
import axios from "../../Configuration/AxiosConfig";
import { Table, Popover, Spin, Modal, Form, Input, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ButtonCPN from "../../components/Button/Button";

const PopoverItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #f8b600;
  }
`;

const CustomerContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const FormContainer = styled.div`
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
const Customer = () => {
  const [DsKhachHang, SetDsKhachHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
  const [showAddUser, setShowAddUser] = useState(false);
  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const fetchData = async (page = 1, pageSize = 6, role="customer") => {
    setLoading(false);
    const response = await axios.get("/users", {
      params: { page, pageSize, role },
    });
    SetDsKhachHang(response.result.data);
    setPagination({
      current: response.result.currentPage,
      pageSize: response.result.pageSize,
      total: response.result.totalElements,
    });
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }
  const updateUserStatus = async (id, status, userData) => {
    const response = await axios.put(`/users/${id}`, {
      ...userData,
      status: status,
    });
  };

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
  
  const columnsCustomer = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {id.slice(0, 6)}...
        </span>
      ),
    },
    {
      title: "Thông tin khách hàng",
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
    { title: "Email", 
      render: (record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {record.email}
        </span>
      ),
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      render: () => "*****",
    },
    { title: "Số điện thoại", 
      render: (record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {record.phoneNumber || "N/A"}
        </span>
      ),
    },
    { title: "Giới tính", 
      render: (record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {record.gender || "N/A"}
        </span>
      ),
    },
    {
      title: "Loại khách hàng",
      dataIndex: "customerType",
      key: "customerType",
      render: (customerType, record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {Array.isArray(customerType)
            ? customerType.map((type) => type.name).join(", ")
            : customerType?.name || "N/A"}
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popover
          content={
            <div>
              <PopoverItem onClick={() => showModal(record)}>Edit</PopoverItem>
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
          <div style={{ cursor: "pointer", fontSize: "20px", color: "#3518f0" }}>
            <SettingOutlined />
          </div>
        </Popover>
      ),
    },
  ];

  return (
    <CustomerContainer>
      <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
        Danh sách khách hàng
      </div>
      <Table
        dataSource={DsKhachHang}
        columns={columnsCustomer}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="id"
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
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Chỉnh sửa thông tin khách hàng</div>
                <Form layout="vertical" >
                  <Form.Item
                      label="Họ tên khách hàng"
                      name="name"
                  >
                  <Input placeholder="Nhập họ tên khách hàng" />
                  </Form.Item>
                  <Form.Item
                      label="Email"
                      name="email"
                  >
                  <Input placeholder="Nhập email" />
                  </Form.Item>
                  <Form.Item
                      label="Trạng thái"
                      name="status"
                  >
                  <Input placeholder="Nhập trạng thái" />
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
    </CustomerContainer>
  );
};

export default Customer;