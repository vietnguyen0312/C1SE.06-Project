import React from 'react';
import { Table } from 'antd';

const dataSource = [
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
];


const EnhancedTable = () => (
    <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
            pageSize: 5,
            showTotal: (total, range) => (
                <span style={{ marginRight: '900px' }}>
                    Showing {range[0]} to {range[1]} of {total} entries
                </span>
            ),
        }}
    />
);
const Customer = () => {
    return (
        <div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Customer</div>
            <EnhancedTable />
        </div>
    );
};

export default Customer;