import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { RetweetOutlined, UserOutlined, CalendarOutlined, HomeOutlined, DollarOutlined, RiseOutlined, FallOutlined, SettingOutlined, BarsOutlined, SortAscendingOutlined, SortDescendingOutlined, EyeOutlined } from '@ant-design/icons';
import { LineChart, Line, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Select, Input, Table, Popover, Modal } from 'antd';
import ButtonCPN from '../../components/Button/Button';
import HistoryBookingRoom from '../../Layout/PublicLayout/HistoryBill/HistoryBookingRoom';
import HistoryTicketBill from '../../Service/HistoryTicketBill';

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
    background-color: #fff;
    border-radius: 10px;
    width: 74%;
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
const ImgService = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
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


const columnsTicket = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    {
        title: "Thông tin khách hàng",
        key: "userInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Loại khách hàng', dataIndex: 'type', key: 'type' },
    { title: 'Ngày đặt', dataIndex: 'bookingDate', key: 'bookingDate' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { 
        title: 'Chi tiết', 
        dataIndex: 'action', 
        key: 'action',
        render: () => (
                <div style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center',display: 'flex' }}>
                    <EyeOutlined />
                </div>
        ),
    },
];

const dataSourceTicket = [{ id: 1, name: 'Nguyễn Văn A', gender: 'Nam', type: 'âcsc', bookingDate: '2024-11-10', phoneNumber: '0123456789' }, { id: 2, name: 'Trần Thị B', gender: 'Nữ', type: 'Vip', bookingDate: '2024-11-12', phoneNumber: '0987654321' }, { id: 3, name: 'Lê Văn C', gender: 'Nam', type: 'Vip', bookingDate: '2024-11-14', phoneNumber: '0912345678' }, { id: 4, name: 'Phạm Thị D', gender: 'Nữ', type: 'Vip', bookingDate: '2024-11-15', phoneNumber: '0901234567' }, { id: 5, name: 'Hoàng Văn E', gender: 'Nam', type: 'Vip', bookingDate: '2024-11-16', phoneNumber: '0923456789' }];


const roomColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    {
        title: "Thông tin khách hàng",
        key: "userInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Loại khách hàng', dataIndex: 'type', key: 'type' },
    { title: 'Ngày đặt', dataIndex: 'bookingDate', key: 'bookingDate' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { 
        title: 'Chi tiết', 
        dataIndex: 'action', 
        key: 'action',
        render: () => (
                <div style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center',display: 'flex' }}>
                    <EyeOutlined />
                </div>
        ),
    },
];
const roomDataSource = [{ id: 1, name: 'Nguyễn Văn A', gender: 'Nam', type: 'Vip', bookingDate: '2024-11-10', phoneNumber: '0123456789' }, { id: 2, name: 'Trần Thị B', gender: 'Nữ', type: 'Vip', bookingDate: '2024-11-12', phoneNumber: '0987654321' }, { id: 3, name: 'Lê Văn C', gender: 'Nam', type: 'Vip', bookingDate: '2024-11-14', phoneNumber: '0912345678' }, { id: 4, name: 'Phạm Thị D', gender: 'Nữ', type: 'Vip', bookingDate: '2024-11-15', phoneNumber: '0901234567' }, { id: 5, name: 'Hoàng Văn E', gender: 'Nam', type: 'Vip', bookingDate: '2024-11-16', phoneNumber: '0923456789' }];

const ServiceDetailColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    {
        title: "Thông tin dịch vụ",
        key: "serviceInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    { title: 'Loại vé', dataIndex: 'type', key: 'type' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Đơn giá', dataIndex: 'price', key: 'price',
        render :(price)=>{
            return <div>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
        }
    },
    { title: 'Thành tiền', dataIndex: 'total', key: 'total', sorter: (a, b) => a.total - b.total,
        render: (total)=>{
            return <div>{total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
        }
     },
];

const ServiceDetailDataSource = [
    {
        id: 1,
        image: <img src="https://via.placeholder.com/80" alt="Service 1" style={{ borderRadius: '8px' }} />,
        name: 'Dịch vụ Massage',
        type: 'Người lớn',
        quantity: 2,
        price: 300000,
        total: 600000,
    },
    {
        id: 2,
        image: <img src="https://via.placeholder.com/80" alt="Service 2" style={{ borderRadius: '8px' }} />,
        name: 'Hồ bơi vô cực',
        type: 'Trẻ em',
        quantity: 3,
        price: 100000,
        total: 300000,
    },
];

const RoomDetailColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    {
        title: "Thông tin phòng",
        key: "roomInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    { title: 'Loại phòng', dataIndex: 'type', key: 'type' },
    { title: 'Phòng số', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Số lượng người', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Thành tiền', dataIndex: 'total', key: 'total', sorter: (a, b) => a.total - b.total,
        render: (total)=>{
            return <div>{total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
        }
     },
];
const RoomDetailDataSource = [
    {
        id: 1,
        image: <img src="https://via.placeholder.com/80" alt="Room 1" style={{ borderRadius: '8px' }} />,
        name: 'Ph��ng Deluxe',
        type: 'Deluxe',
        roomNumber: 101,
        quantity: 2,
        total: 2000000,
    },
    {
        id: 2,
        image: <img src="https://via.placeholder.com/80" alt="Room 2" style={{ borderRadius: '8px' }} />,
        name: 'Phòng Suite',
        type: 'Suite',
        roomNumber: 202,
        quantity: 3,
        total: 4500000,
    },
];

const viewServiceColumns = [
    {
        title: 'TOP', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id
    },
    {
        title: "Thông tin dịch vụ",
        key: "serviceInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    {title:'Số lương vé bán',dataIndex:'quantity',key:'quantity'},
    {title:'Tổng tiền',dataIndex:'total',key:'total',sorter: (a, b) => a.total - b.total,
        render: (total)=>{
            return <div>{total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
        }
    },
]
const viewServiceDataSource = [
    {
      id: 1,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ A - Tư vấn du lịch",
      type: "Loại 1 - Du lịch trong nước",
      quantity: 150,
      total: 500000,
      description: "Dịch vụ tư vấn du lịch trong nước, giúp khách hàng lên kế hoạch chuyến đi phù hợp."
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ B - Hướng dẫn viên",
      type: "Loại 2 - Hướng dẫn viên du lịch",
      quantity: 120,
      total: 400000,
      description: "Dịch vụ cung cấp hướng dẫn viên chuyên nghiệp cho các tour du lịch trong và ngoài nước."
    },
    {
      id: 3,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ C - Khám phá ẩm thực",
      type: "Loại 3 - Tour ẩm thực",
      quantity: 200,
      total: 700000,
      description: "Tour khám phá các món ăn đặc sản, mang đến trải nghiệm ẩm thực đặc sắc cho du khách."
    },
    {
      id: 4,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ D - Khách sạn 5 sao",
      type: "Loại 1 - Chỗ ở cao cấp",
      quantity: 180,
      total: 600000,
      description: "Dịch vụ đặt phòng khách sạn cao cấp với đầy đủ tiện nghi, phục vụ 24/7."
    },
    {
      id: 5,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ E - Tour sinh thái",
      type: "Loại 2 - Du lịch sinh thái",
      quantity: 220,
      total: 800000,
      description: "Tour khám phá thiên nhiên hoang dã, trải nghiệm các hoạt động sinh thái tại các khu vực bảo tồn."
    },
    {
      id: 6,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ F - Du lịch biển",
      type: "Loại 1 - Du lịch biển",
      quantity: 140,
      total: 450000,
      description: "Dịch vụ tour biển, đưa khách đến các bãi biển nổi tiếng và các khu nghỉ dưỡng biển tuyệt vời."
    },
    {
      id: 7,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ G - Tour văn hóa",
      type: "Loại 2 - Du lịch văn hóa",
      quantity: 110,
      total: 350000,
      description: "Dịch vụ khám phá các di tích văn hóa và các địa điểm lịch sử, mang lại cái nhìn sâu sắc về văn hóa bản địa."
    },
    {
      id: 8,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ H - Nghỉ dưỡng spa",
      type: "Loại 3 - Chăm sóc sức khỏe",
      quantity: 180,
      total: 700000,
      description: "Dịch vụ nghỉ dưỡng kết hợp với các liệu trình spa cao cấp, mang đến sự thư giãn tuyệt đối cho khách hàng."
    },
    {
      id: 9,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ I - Du lịch mạo hiểm",
      type: "Loại 1 - Du lịch mạo hiểm",
      quantity: 160,
      total: 500000,
      description: "Dịch vụ du lịch mạo hiểm, phù hợp cho những ai yêu thích thử thách và khám phá những địa điểm hoang sơ."
    },
    {
      id: 10,
      image: "https://via.placeholder.com/40",
      name: "Dịch vụ J - Du lịch tâm linh",
      type: "Loại 2 - Du lịch tâm linh",
      quantity: 190,
      total: 650000,
      description: "Dịch vụ du lịch tìm hiểu về các địa điểm linh thiêng, tâm linh nổi tiếng ở các vùng miền."
    },
  ];
  
const viewRoomColumns = [
    {
        title: 'TOP', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id
    },
    {
        title: "Thông tin phòng",
        key: "roomInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.name}</span>
          </div>
        ),
    },
    {title:'Loại phòng',dataIndex:'type',key:'type'},
    {title:'Phòng số',dataIndex:'roomNumber',key:'roomNumber'},
    {title:'Số lương đã đặt',dataIndex:'quantity',key:'quantity'},
    {title:'Tổng tiền',dataIndex:'total',key:'total',sorter: (a, b) => a.total - b.total,
        render: (total)=>{
            return <div>{total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
        }
    },  
]
const viewRoomDataSource = [
    {
        id: 1,
        image: "https://via.placeholder.com/40",
        name: "NameRoom1",
        type: "Deluxe",
        roomNumber: 101,
        quantity: 2,
        total: 2000000,
    },
    {
        id: 2,
        image: "https://via.placeholder.com/40",
        name: "NameRoom2",
        type: "Suite",
        roomNumber: 202,
        quantity: 3,
        total: 4500000,
    },
    {
        id: 3,
        image: "https://via.placeholder.com/40",
        name: "NameRoom3",
        type: "Standard",
        roomNumber: 303,
        quantity: 1,
        total: 1000000,
    },
]
const Dashboard = () => {
    const [pageSize, setPageSize] = useState(5);
    const [showHistoryTicket, setShowHistoryTicket] = useState(true);
    const [showHistoryRoom, setShowHistoryRoom] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    const handlePageSizeChange = value => {
        setPageSize(Number(value));
    };

    const showModal = (content, size = {}) => {
        setModalContent(content);
        setIsModalVisible(true);
        setModalSize(size);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                            <DateStyle>Last 5 Months    </DateStyle>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>
                                <div>Revenue</div>
                                <ViewStyle
                                onClick={() => showModal(
                                    <Table
                                        dataSource={viewServiceDataSource}
                                        columns={viewServiceColumns}
                                        pagination={{
                                            pageSize: 6,
                                        }}
                                    />,
                                    { width: 1200, height: 600 }
                                )}
                                >       
                                    View →
                                </ViewStyle>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                    <div style={{ display: 'flex' }}>
                                        <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Service1</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> ServiceType1</div>
                                        </div>
                                        
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
                                    <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Service2</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> ServiceType2</div>
                                        </div>
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
                                        <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Service3</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> ServiceType3</div>
                                        </div>
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

            <RevenueContainer>
                <BookingContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ padding: '20px 20px 0 20px' }}>
                            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Lịch sử hoá đơn</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <ButtonCPN 
                                    text='Ticket' 
                                    onClick={() => {
                                        setShowHistoryTicket(true); 
                                        setShowHistoryRoom(false);  
                                    }}
                                    style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px'  }}
                                />
                                <ButtonCPN 
                                    text='Rooms' 
                                    onClick={() => {
                                        setShowHistoryRoom(true); 
                                        setShowHistoryTicket(false); 
                                    }}
                                    style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            {showHistoryTicket && <Table
                                dataSource={dataSourceTicket}
                                columns={columnsTicket.map(column => ({
                                    ...column,
                                    render: column.dataIndex === 'action' ? () => (
                                        <div 
                                            style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center', display: 'flex' }}
                                            onClick={() => showModal(
                                            <Table
                                                dataSource={ServiceDetailDataSource}
                                                columns={ServiceDetailColumns}
                                                pagination={{
                                                    pageSize: 6,
                                                }}
                                            />,
                                            { width: 1200, height: 600 }
                                            )}
                                        >
                                            <EyeOutlined />
                                        </div>
                                    ) : column.render
                                }))}
                                pagination={{
                                    pageSize: 6,
                                }}
                            />}
                            {showHistoryRoom && <Table
                                dataSource={roomDataSource}
                                columns={roomColumns.map(column => ({
                                    ...column,
                                    render: column.dataIndex === 'action' ? () => (
                                        <div 
                                            style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center', display: 'flex' }}
                                            onClick={() => showModal(
                                            <Table
                                                dataSource={RoomDetailDataSource}
                                                columns={RoomDetailColumns}
                                                pagination={{
                                                    pageSize: 6,
                                                }}
                                            />,
                                            { width: 1200, height: 600 }
                                            )}
                                        >
                                            <EyeOutlined />
                                        </div>
                                    ) : column.render
                                }))}
                                pagination={{
                                    pageSize: 6,
                                }}
                            />}
                        </div>
                    </div>
                </BookingContainer>
                <RevenueContainerRight>
                    <DashboardContainer>
                        <div style={{ fontSize: '20px', fontWeight: '600' }}>Top Room</div>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>
                                <div>Revenue</div>
                                <ViewStyle
                                onClick={() => showModal(
                                    <Table
                                        dataSource={viewRoomDataSource}
                                        columns={viewRoomColumns}
                                        pagination={{
                                            pageSize: 6,
                                        }}
                                    />,
                                    { width: 1200, height: 600 }
                                )}
                                >       
                                    View →
                                </ViewStyle>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                    <div style={{ display: 'flex' }}>
                                        <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Room1</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> RoomType1</div>
                                        </div>
                                        
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
                                    <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Room2</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> RoomType2</div>
                                        </div>
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
                                        <ImgService src={('../../Assets/Images/service1.png')} />
                                        <div>
                                            <div style={{ marginRight: '10px' }}>Name Room3</div>
                                            <div style={{ color: '#999', fontSize: '13px' }}> RoomType3</div>
                                        </div>
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

            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                centered
                width={modalSize.width}
                height={modalSize.height}
                style={{ top: 20, borderRadius: '10px', overflow: 'hidden' }}
                >
                {modalContent}
            </Modal>

                </Container>
    );
}

export default Dashboard;