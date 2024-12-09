import React, { useState, useEffect } from "react";
import axios from "../../Configuration/AxiosConfig";
import { Table, Popover, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styled from "styled-components";

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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (id) => `${id.slice(0, 6)}...`,
  },
  {
    title: "Thông tin khách hàng",
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
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Mật khẩu",
    dataIndex: "password",
    key: "password",
    render: () => "*****",
  },
  { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Giới tính", dataIndex: "gender", key: "gender" },
  {
    title: "Loại khách hàng",
    dataIndex: "customerType",
    key: "customerType",
    render: (customerType) =>
      Array.isArray(customerType)
        ? customerType.map((type) => type.name).join(", ")
        : customerType?.name || "N/A",
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Popover
        content={
          <div>
            <PopoverItem onClick={() => handleEdit(record)}>Edit</PopoverItem>
            <PopoverItem onClick={() => handleDelete(record)}>
              Delete
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

const handleEdit = (record) => {
  console.log("Edit user:", record);
};

const handleDelete = (record) => {
  console.log("Delete user:", record);
};

const Customer = () => {
  const [DsKhachHang, SetDsKhachHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 6) => {
    setLoading(false);
    const response = await axios.get("/users", {
      params: { page, pageSize },
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

  return (
    <CustomerContainer>
      <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>Danh sách khách hàng</div>
      <Table
        dataSource={DsKhachHang}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="id"
      />
    </CustomerContainer>
  );
};

export default Customer;
