import React from 'react';
import { Table, Popover } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const PopoverItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: #f8b600;
    }
`
const dataSource = [
    { key: '1', name: 'Nguyễn Văn A', age: 30, department: 'IT', position: 'Software Engineer', date: '2024-11-01' },
    { key: '2', name: 'Trần Thị B', age: 28, department: 'Marketing', position: 'Content Creator', date: '2024-10-15' },
    { key: '3', name: 'Lê Văn C', age: 35, department: 'Finance', position: 'Accountant', date: '2024-09-20' },
    { key: '1', name: 'Nguyễn Văn A', age: 30, department: 'IT', position: 'Software Engineer', date: '2024-11-01' },
    { key: '2', name: 'Trần Thị B', age: 28, department: 'Marketing', position: 'Content Creator', date: '2024-10-15' },
    { key: '3', name: 'Lê Văn C', age: 35, department: 'Finance', position: 'Accountant', date: '2024-09-20' },
  
];

const columns = [
    { title: 'Họ và Tên', dataIndex: 'name', key: 'name' },
    { title: 'Tuổi', dataIndex: 'age', key: 'age' },
    { title: 'Phòng Ban', dataIndex: 'department', key: 'department' },
    { title: 'Vị Trí', dataIndex: 'position', key: 'position' },
    { title: 'Ngày Tham Gia', dataIndex: 'date', key: 'date' },
    {
        title: 'Action', dataIndex: 'action', key: 'action',
        render: (record) => (
            <Popover content={
                <div>
                    <PopoverItem onClick={() => handleEdit(record)}>Edit</PopoverItem>
                    <PopoverItem onClick={() => handleDelete(record)}>Delete</PopoverItem>
                </div>
            } trigger="click" placement='left'>
                <div style={{ cursor: 'pointer', fontSize: '20px', color: '#3518f0'}}>
                    <SettingOutlined />
                </div>
            </Popover>
        )
    },
];


const EnhancedTable = () => (
    <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
            pageSize: 6,
            showTotal: (total, range) => (
                <span style={{ marginRight: '850px' }}>
                    Showing {range[0]} to {range[1]} of {total} entries
                </span>
            ),
        }}
    />
);
const Employee = () => {
    return (
        <div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Employee</div>
            <div> <EnhancedTable /> </div>
        </div>
    );
};

export default Employee;