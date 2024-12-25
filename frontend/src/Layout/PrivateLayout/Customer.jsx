import React, { useState, useEffect } from "react";
import axios from "../../Configuration/AxiosConfig";
import { Table, Popover, Spin, Modal, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { debounce } from 'lodash';
const { Search } = Input;
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

const Customer = () => {
  const [search, setSearch] = useState("");
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

  const fetchData = async (page = 1, pageSize = 6, role="customer", search="") => {
    setLoading(false);
    const response = await axios.get("/users", {
      params: { page, pageSize, role, search },
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
  
  const handleSearch = debounce((value) => {
    setSearch(value);
    fetchData(pagination.current, pagination.pageSize, "customer", value);
  }, 300);

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
      render: (status) => (
        <span style={{ 
          color: status === "BAN" ? "#f44336" : "#52c41a",
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
          <div style={{ cursor: "pointer", fontSize: "20px", color: "#3518f0" }}>
            <SettingOutlined />
          </div>
        </Popover>
      ),
    },
  ];

  return (
    <CustomerContainer>
      <Search
        placeholder="Tìm kiếm theo tên hoặc email..."
        onChange={(e) => handleSearch(e.target.value)}
        allowClear
        style={{ marginBottom: "20px", width:'300px' }}
      />
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
      </Modal>
    </CustomerContainer>
  );
};

export default Customer;