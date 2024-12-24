import React, { useState, useEffect } from "react";
import axios from "../../Configuration/AxiosConfig";
import { Table, Spin } from "antd";
import styled from "styled-components";


const ManagerContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Manager = () => {
  const [DsManager, SetDsManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 6, role="manager") => {
    setLoading(false);
    const response = await axios.get("/users", {
      params: { page, pageSize, role },
    });
    SetDsManager(response.result.data);
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
  
  const columnsManager = [
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
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <span style={{ opacity: record.status === "BAN" ? 0.5 : 1 }}>
          {status === "BAN" ? "Bị cấm " : "Đang hoạt động"}
        </span>
      ),
    },
  ];

  return (
    <ManagerContainer>
      <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
        Danh sách quản lý
      </div>
      <Table
        dataSource={DsManager}
        columns={columnsManager}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="id"
      />

    </ManagerContainer>
  );
};

export default Manager;