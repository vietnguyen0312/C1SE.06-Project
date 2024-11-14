import React, { Component } from 'react';
import styled from 'styled-components';
import { RetweetOutlined, UserOutlined, CalendarOutlined, HomeOutlined, DollarOutlined, RiseOutlined, FallOutlined, SettingOutlined, BarsOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { LineChart, Line, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Select, Input, Table, Popover } from 'antd';
import { useState } from 'react';


const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

export const DashboardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #c0c0c0;
    cursor: pointer;
    transition: color 0.3s ease;
`;

export const HeaderItem = styled.p`
    transition: color 0.3s ease;
    &:hover {
        color: #f8b600;
    }
`;
const ChartContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-top: 20px;
`;
const ChartItem = styled.div`
    width: 300px;
    height: 220px;
    border-radius: 10px;
`;
const UserIcon = styled(UserOutlined)`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: rgba(72, 85, 104, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
const HomeIcon = styled(HomeOutlined)`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: rgba(72, 85, 104, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
const BookIcon = styled(CalendarOutlined)`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: rgba(72, 85, 104, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
const DollarIcon = styled(DollarOutlined)`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: rgba(72, 85, 104, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
const ChartItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
`;
const NumberStyle = styled.div`
        margin: 0;
    color: #485568;
    font-size: 22px;
    line-height: 20px;
    font-weight: 700;
`
const ChartTitle = styled.div`
    color: #777;
    font-size: 17px;
    font-weight: 500;
`
const ChartFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 15px;
`
const Percent = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ increase }) => increase ? '#2bbb93' : '#ff6347'};
`;
const Percent1 = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ increase }) => increase ? '#2bbb93' : '#ff6347'};
`;
const ChartLine = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
const TooltipContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    color: #333;
`;
const TooltipTitle = styled.div`
    font-size: 14px;
    color: #333;
    background-color: silver;
    padding: 8px;
`;
const TooltipContent = styled.div`
    font-size: 14px;
    color: #333;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`;
const RevenueContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`
const RevenueContainerLeft = styled.div`
    width: 70%;
    border-radius: 10px;
    background-color: #fff;
    padding: 30px 20px;
    border-bottom: 1px solid #e5e5e5;
`
const RevenueContainerRight = styled.div`
    width: 30%;
    border-radius: 10px;
    background-color: #fff;
    padding: 30px 20px;
    border-bottom: 1px solid #e5e5e5;
`
export const DateStyle = styled.div`
    color: #777;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 7px;
    width: 20%;
`
const Revenue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
`;
const ViewStyle = styled.div`
    color: #f8b600;
    cursor: pointer;
    &:hover {
        color: #ccc;
    }
`
const BookingContainer = styled.div`
    margin-top: 30px;
    background-color: #fff;
    border-radius: 10px;
`
const ProgressBar = styled.div`
    width: 100%; 
    height: 5px;
    background-color: transparent; 
    border-radius: 5px;
    margin-bottom: 15px;
    position: relative;
    background-color: #ccc;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: ${({ value }) => value}%; 
        height: 100%;
        background-color: #8383ff; 
        border-radius: 5px;
    }
`;
const BookingFooter = styled.div`
    padding: 30px 20px;
    border-top: 1px solid #e5e5e5;
`
const SearchStyle = styled(Input)`
    width: 200px;
`
const PopoverItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: #f8b600;
    }
`
const BarsIcon = styled(BarsOutlined)`
    font-size: 25px;
    cursor:pointer;
    &:hover {
        color: #f8b600;
    }
`
const data = [
    { date: 'June', Visitors: 400, Bookings: 300, Revenue: 800, Rooms: 600 },
    { date: 'July', Visitors: 300, Bookings: 200, Revenue: 400, Rooms: 500 },
    { date: 'August', Visitors: 500, Bookings: 400, Revenue: 600, Rooms: 700 },
    { date: 'September', Visitors: 600, Bookings: 500, Revenue: 500, Rooms: 800 },
    { date: 'October', Visitors: 700, Bookings: 600, Revenue: 400, Rooms: 900 },
];

const RevenueData = [
    { month: 'June', Bookings: 1000, Revenue: 666, Expense: 500, Profit: 166 },
    { month: 'July', Bookings: 1200, Revenue: 750, Expense: 550, Profit: 200 },
    { month: 'August', Bookings: 1300, Revenue: 820, Expense: 600, Profit: 220 },
    { month: 'September', Bookings: 1100, Revenue: 700, Expense: 520, Profit: 180 },
    { month: 'October', Bookings: 1400, Revenue: 850, Expense: 650, Profit: 200 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <TooltipContainer>
                <TooltipTitle>{payload[0].payload.date}</TooltipTitle>
                <TooltipContent><div style={{ width: '10px', height: '10px', backgroundColor: 'black', borderRadius: '50%' }}></div>{payload[0].value}</TooltipContent>
            </TooltipContainer>
        );
    }
    return null;
};

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


const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'CheckIn', dataIndex: 'checkIn', key: 'checkIn', sorter: (a, b) => new Date(a.checkIn) - new Date(b.checkIn) },
    { title: 'CheckOut', dataIndex: 'checkOut', key: 'checkOut', sorter: (a, b) => new Date(a.checkOut) - new Date(b.checkOut) },
    { title: 'Proof', dataIndex: 'proof', key: 'proof' },
    {
        title: 'Payment', dataIndex: 'payment', key: 'payment',
        render: text => {
            const [type, room] = text.split(':');
            let color;

            switch (type.trim()) {
                case 'Credit Card':
                    color = '#ff8c00';
                    break;
                case 'PayPal':
                    color = '#4682b4';
                    break;
                case 'Cash':
                    color = '#32cd32';
                    break;
                default:
                    color = '#808080';
            }

            return (
                <span>
                    <span style={{ color }}>{type}:</span> {room}
                </span>
            );
        },
    },
    {
        title: 'Amount', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount - b.amount,
        render: text => {
            return <span><DollarOutlined /> {text}</span>
        }

    },
    {
        title: 'RoomNo', dataIndex: 'roomNo', key: 'roomNo',
        render: text => {
            const [type, room] = text.split(':');
            let color;

            switch (type.trim()) {
                case 'Vip':
                    color = '#d32f2f';
                    break;
                case 'Deluxe':
                    color = '#1e88e5';
                    break;
                case 'Standard':
                    color = '#388e3c';
                    break;
                default:
                    color = '#6d6d6d';
            }

            return (
                <span>
                    <span style={{ color }}>{type}:</span> {room}
                </span>
            );
        },
    },
    { title: 'Rooms', dataIndex: 'rooms', key: 'rooms' },
    {
        title: 'Action', dataIndex: 'action', key: 'action',
        render: (record) => (
            <Popover content={
                <div>
                    <PopoverItem onClick={() => handleEdit(record)}>Edit</PopoverItem>
                    <PopoverItem onClick={() => handleDelete(record)}>Delete</PopoverItem>
                </div>
            } trigger="click" placement='left'>
                <div style={{ cursor: 'pointer', fontSize: '20px', color: '#3518f0', display: 'flex', justifyContent: 'center' }}>
                    <SettingOutlined />
                </div>
            </Popover>
        )
    },
];

const dataSource = [
    { key: '1', id: '1', name: 'John Brown', checkIn: '2023-01-01', checkOut: '2023-01-05', proof: 'ID', payment: 'Credit Card', amount: '300', roomNo: 'Vip: 101', rooms: '2', action: 'Edit/Delete' },
    { key: '2', id: '2', name: 'Jane Smith', checkIn: '2023-02-01', checkOut: '2023-02-06', proof: 'Passport', payment: 'PayPal', amount: '400', roomNo: 'Deluxe: 202', rooms: '1', action: 'Edit/Delete' },
    { key: '3', id: '3', name: 'Alex Johnson', checkIn: '2023-03-01', checkOut: '2023-03-04', proof: 'ID', payment: 'Credit Card', amount: '250', roomNo: 'Standard: 303', rooms: '1', action: 'Edit/Delete' },
    { key: '4', id: '4', name: 'Chris Lee', checkIn: '2023-04-02', checkOut: '2023-04-06', proof: 'ID', payment: 'Cash', amount: '350', roomNo: 'Vip: 404', rooms: '3', action: 'Edit/Delete' },
    { key: '5', id: '5', name: 'Emma White', checkIn: '2023-05-03', checkOut: '2023-05-08', proof: 'Passport', payment: 'Credit Card', amount: '500', roomNo: 'Deluxe: 505', rooms: '2', action: 'Edit/Delete' },
    { key: '6', id: '6', name: 'Mike Brown', checkIn: '2023-06-04', checkOut: '2023-06-09', proof: 'ID', payment: 'Credit Card', amount: '320', roomNo: 'Standard: 606', rooms: '2', action: 'Edit/Delete' },
    { key: '7', id: '7', name: 'Lucy Green', checkIn: '2023-07-05', checkOut: '2023-07-10', proof: 'Passport', payment: 'PayPal', amount: '450', roomNo: 'Vip: 707', rooms: '1', action: 'Edit/Delete' },
    { key: '8', id: '8', name: 'David Black', checkIn: '2023-08-06', checkOut: '2023-08-11', proof: 'ID', payment: 'Credit Card', amount: '380', roomNo: 'Deluxe: 808', rooms: '3', action: 'Edit/Delete' },
    { key: '9', id: '9', name: 'Olivia Young', checkIn: '2023-09-07', checkOut: '2023-09-12', proof: 'ID', payment: 'Cash', amount: '290', roomNo: 'Standard: 909', rooms: '1', action: 'Edit/Delete' },
    { key: '10', id: '10', name: 'Lucas King', checkIn: '2023-10-08', checkOut: '2023-10-13', proof: 'Passport', payment: 'Credit Card', amount: '470', roomNo: 'Vip: 1010', rooms: '2', action: 'Edit/Delete' },
];



const Dashboard = () => {
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = value => {
        setPageSize(Number(value));
    };

    return (
        <Container>
            <DashboardContainer>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Dashboard</div>
                    <Header>
                        <HeaderItem>Home</HeaderItem>
                        <p>→</p>
                        <HeaderItem>Dashboard</HeaderItem>
                    </Header>
                </div>
                <div>
                    <RetweetOutlined />
                </div>
            </DashboardContainer>
            <ChartContainer>
                <ChartItem style={{ backgroundColor: '#ffc6c6' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Bookings</ChartTitle>
                            <NumberStyle>100K</NumberStyle>
                        </div>
                        <div>
                            <BookIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={data[data.length - 1].Bookings > data[data.length - 2].Bookings}>
                            {data[data.length - 1].Bookings > data[data.length - 2].Bookings ? <RiseOutlined /> : <FallOutlined />}
                            <div>10%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <BarChart width={220} height={90} data={data}>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Bookings" fill="#cccccc" />
                        </BarChart>
                    </ChartLine>
                </ChartItem>

                <ChartItem style={{ backgroundColor: '#9df8cc' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Rooms</ChartTitle>
                            <NumberStyle>100K</NumberStyle>
                        </div>
                        <div>
                            <HomeIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={data[data.length - 1].Rooms > data[data.length - 2].Rooms}>
                            {data[data.length - 1].Rooms > data[data.length - 2].Rooms ? <RiseOutlined /> : <FallOutlined />}
                            <div>10%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <BarChart width={220} height={90} data={data}>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Rooms" fill="#cccccc" />
                        </BarChart>
                    </ChartLine>
                </ChartItem>
                
                <ChartItem style={{ backgroundColor: '#ddddfc' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Visitors</ChartTitle>
                            <NumberStyle>100K</NumberStyle>
                        </div>
                        <div>
                            <UserIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={data[data.length - 1].Visitors > data[data.length - 2].Visitors}>
                            {data[data.length - 1].Visitors > data[data.length - 2].Visitors ? <RiseOutlined /> : <FallOutlined />}
                            <div>10%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={data}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="Visitors" stroke="#000000" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ChartLine>
                </ChartItem>
                
                <ChartItem style={{ backgroundColor: '#ffc6ff' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Revenue</ChartTitle>
                            <NumberStyle>100K</NumberStyle>
                        </div>
                        <div>
                            <DollarIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={data[data.length - 1].Revenue > data[data.length - 2].Revenue}>
                            {data[data.length - 1].Revenue > data[data.length - 2].Revenue ? <RiseOutlined /> : <FallOutlined />}
                            <div>10%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={data}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="Revenue" stroke="#000000" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ChartLine>
                </ChartItem>
            </ChartContainer>
            <RevenueContainer>
                <RevenueContainerLeft>
                    <DashboardContainer>
                        <div style={{ fontSize: '20px', fontWeight: '600' }}>Revenue Overview</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <RetweetOutlined />
                            <DateStyle>Nov 9, 2024 - Nov 15, 2024</DateStyle>
                        </div>
                    </DashboardContainer>
                    <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e5e5' }}>
                        <Revenue>
                            <LineChart width={900} height={350} data={RevenueData}>
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Bookings" stroke="#8884d8" name=" Bookings" />
                                <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" name=" Revenue" />
                                <Line type="monotone" dataKey="Expense" stroke="#ffc658" name=" Expense" />
                                <Line type="monotone" dataKey="Profit" stroke="#ff7300" name=" Profit" />
                            </LineChart>
                        </Revenue>
                    </div>
                </RevenueContainerLeft>
                <RevenueContainerRight>
                    <DashboardContainer>
                        <div style={{ fontSize: '20px', fontWeight: '600' }}>Top Service</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Popover content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                    <PopoverItem style={{ borderBottom: '1px solid #000000' }}>
                                        Date
                                    </PopoverItem>
                                    <div>
                                        <PopoverItem>Yesterday</PopoverItem>
                                        <PopoverItem>Last 7 days</PopoverItem>
                                        <PopoverItem>Last 30 days</PopoverItem>
                                        <PopoverItem>This month</PopoverItem>
                                        <PopoverItem>Last month</PopoverItem>
                                        <PopoverItem>Custom range</PopoverItem>
                                    </div>
                                </div>
                            } trigger="click" placement='left'
                            >
                                <BarsIcon />
                            </Popover>
                        </div>
                    </DashboardContainer>
                    <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e5e5' }}>
                        <div>

                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>
                                <div>Revenue</div>
                                <ViewStyle>View →</ViewStyle>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>Service1</div>
                                        <Percent1 increase={data[data.length - 1].Visitors > data[data.length - 2].Visitors} >
                                            {data[data.length - 1].Visitors > data[data.length - 2].Visitors ? <RiseOutlined /> : <FallOutlined />}
                                            <div>10%</div>
                                        </Percent1>
                                    </div>
                                    <div style={{ gap: '5px', display: 'flex', alignItems: 'center' }}><DollarOutlined /><div>10</div></div>
                                </div>
                                <ProgressBar value={100} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }} >Service2</div>
                                        <Percent1 increase={data[data.length - 1].Visitors > data[data.length - 2].Visitors} >
                                            {data[data.length - 1].Visitors > data[data.length - 2].Visitors ? <RiseOutlined /> : <FallOutlined />}
                                            <div>10%</div>
                                        </Percent1>
                                    </div>
                                    <div style={{ gap: '5px', display: 'flex', alignItems: 'center' }}><DollarOutlined /><div>10</div></div>
                                </div>
                                <ProgressBar value={50} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>Service3</div>
                                        <Percent1 increase={data[data.length - 1].Visitors > data[data.length - 2].Visitors} >
                                            {data[data.length - 1].Visitors > data[data.length - 2].Visitors ? <RiseOutlined /> : <FallOutlined />}
                                            <div>10%</div>
                                        </Percent1>
                                    </div>
                                    <div style={{ gap: '5px', display: 'flex', alignItems: 'center' }}><DollarOutlined /><div>10</div></div>
                                </div>
                                <ProgressBar value={10} />
                            </div>
                        </div>
                    </div>
                </RevenueContainerRight>
            </RevenueContainer>
            <BookingContainer>
                <div>
                    <DashboardContainer style={{ padding: '30px 20px' }}>
                        <div style={{ fontSize: '20px', fontWeight: '600' }}>Bookings</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Popover content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                    <PopoverItem style={{ borderBottom: '1px solid #000000' }}>
                                        Date
                                    </PopoverItem>
                                    <div>
                                        <PopoverItem>Yesterday</PopoverItem>
                                        <PopoverItem>Last 7 days</PopoverItem>
                                        <PopoverItem>Last 30 days</PopoverItem>
                                        <PopoverItem>This month</PopoverItem>
                                        <PopoverItem>Last month</PopoverItem>
                                        <PopoverItem>Custom range</PopoverItem>
                                    </div>
                                </div>
                            } trigger="click" placement='left'
                            >
                                <BarsIcon />
                            </Popover>
                        </div>
                    </DashboardContainer>
                </div>
                <BookingFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Select
                            defaultValue="5"
                            style={{ width: 120, marginBottom: 16 }}
                            onChange={handlePageSizeChange}
                            options={[
                                { value: '5', label: '5' },
                                { value: '10', label: '10' },
                                { value: '20', label: '20' },
                                { value: '50', label: '50' },
                                { value: '80', label: '80' },
                                { value: 'All', label: 'All' },
                            ]}
                        />
                        <SearchStyle placeholder="Search" />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <EnhancedTable />
                    </div>
                </BookingFooter>
            </BookingContainer>
        </Container>
    );
}

export default Dashboard;