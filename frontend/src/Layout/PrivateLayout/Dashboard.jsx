import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RetweetOutlined, UserOutlined, CalendarOutlined, HomeOutlined, DollarOutlined, RiseOutlined, FallOutlined, BarsOutlined, EyeOutlined } from '@ant-design/icons';
import { LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Table, Popover, Modal } from 'antd';
import ButtonCPN from '../../components/Button/Button';
import axios from '../../Configuration/AxiosConfig';

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

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <TooltipContainer>
                <TooltipTitle>{payload[0].payload.month}</TooltipTitle>
                <TooltipContent><div style={{ width: '10px', height: '10px', backgroundColor: 'black', borderRadius: '50%' }}></div>{payload[0].value}</TooltipContent>
            </TooltipContainer>
        );
    }
    return null;
};

const ServiceDetailColumns = [
    { title: "ID",render: (record) => `${record.id.slice(0, 6)}...`},
    {
        title: "Thông tin dịch vụ",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.ticket.serviceEntity.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <div>{record.ticket.serviceEntity.name}</div>
          </div>
        ),
    },
    { title: 'Loại vé',
        render: (record)=>{
            return <div>{record.ticket.ticketType.name}</div>
        }
    },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', 
        render: (quantity)=>{
            return <div>{quantity}</div>
        }
    },
    { title: 'Đơn giá',
        render: (record)=>{
            return <div>{record.ticket.price.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div>
        }
    },
    { title: 'Thành tiền', dataIndex: 'total', key: 'total', sorter: (a, b) => a.total - b.total,
        render: (total)=>{
            return <div>{total ? total.toLocaleString('vi-VN',{style:'currency',currency:'VND'}) : 0}</div>
        }
     },
];



const RoomDetailColumns = [
    { title: 'ID', render: (record) => `${record.id.slice(0, 6)}...`},
    {
        title: "Thông tin phòng",
        key: "roomInfo",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.room.roomType.image}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <span>{record.room.roomType.name}</span>
          </div>
        ),
    },
    { title: 'Phòng số',render:(record)=>record.room.roomNumber},
    { title: 'Ngày đặt', render:(record)=>new Date(record.bookingRoom.checkInDate).toLocaleDateString()},
    {title:'Ngày trả',render:(record)=>new Date(record.bookingRoom.checkOutDate).toLocaleDateString()},
    { title: 'Thành tiền', sorter: (a, b) => a.total - b.total,
        render: (record)=>record.room.roomType.price.toLocaleString('vi-VN',{style:'currency',currency:'VND'})
     },
];

const viewRoomColumns = [
    {
        title: 'TOP',
        render: (_, __, index) => index + 1,
    },
    {
        title: "Thông tin phòng",
        key: "roomType.detail",
        render: (record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`${record.roomType.image}`}
              alt="Avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
            />
            <div>
                {record.roomType.name}
            </div>
          </div>
        ),
    },
    {title:'Tổng doanh thu',sorter: (a, b) => a.total - b.total,
        render:(record)=>record.revenue.toLocaleString('vi-VN',{style:'currency',currency:'VND'})
    },  
]

const Dashboard = () => {
    const [showHistoryTicket, setShowHistoryTicket] = useState(true);
    const [showHistoryRoom, setShowHistoryRoom] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    const [revenueData, setRevenueData] = useState([]);
    const [revenueCurrentMonth, setRevenueCurrentMonth] = useState([]);
    const [revenueService, setRevenueService] = useState([]);
    const [revenueRoomType, setRevenueRoomType] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState({
        startDate: 30,
        endDate: 0
    });
    const [revenueService1, setRevenueService1] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [paginationBillTicket, setPaginationBillTicket] = useState([]);
    const [paginationBillRoom, setPaginationBillRoom] = useState([]); 
    const [revenueRoomType1,setRevenueRoomType1]=useState([]);
    const [modalType, setModalType] = useState(null);

    const viewServiceColumns = [
        {
            title: 'TOP',
            render: (_, __, index) => {
                const { current , pageSize } = pagination;
                return ((current - 1) * pageSize) + index + 1;
            },
        },
        {
            title: "Thông tin dịch vụ",
            key: "serviceInfo",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <ImgService src={`${record.serviceEntity.image}`} />
                <span>{record.serviceEntity.name}</span>
              </div>
            ),
        },
        {title:'Tổng doanh thu',
            render: (record) => record.revenue.toLocaleString('vi-VN',{style:'currency',currency:'VND'})
        },
    ]

    useEffect(() => {
        const fetchRevenueData = async () => {
            const response = await axios.get('/revenue/revenue-overall');
            setRevenueData(response.result);
            setRevenueCurrentMonth(response.result[response.result.length - 1]);
        };
        fetchRevenueData();
    }, []);

    useEffect(() => {
        fetchRevenueService(30,0);
        fetchRevenueRoomType(30,0);
        fetchBillTicket();
        fetchBillRoom();
        fetchRevenueService1(30,0,pagination.current,pagination.pageSize);
        fetchRevenueRoomType1(30,0)
    }, []);
    const [tableContent, setTableContent] = useState(null);
    
    useEffect(() => {
        if (isModalVisible && modalType === 'service' && tableContent) {
            setModalContent(
                <Table
                    dataSource={revenueService1.data}
                    columns={viewServiceColumns}
                    pagination={{
                        pageSize: pagination.pageSize,
                        current: pagination.current,
                        total: pagination.total,
                    }}
                    rowKey='id'
                    onChange={handleTableChange}
                />
            );
        }
    }, [revenueService1, pagination, isModalVisible, modalType]);

    //truyền ngày startDate để lọc cho tới hiện tại
    const fetchRevenueService = async (startDate, endDate) => {
        const response = await axios.get('/revenue/service-revenue', {params: {
            startDate: new Date(new Date().setDate(new Date().getDate() - startDate)).toLocaleDateString('vi-VN'),
            endDate: new Date(new Date().setDate(new Date().getDate() - endDate)).toLocaleDateString('vi-VN'),
            size: 3
        }});
        setRevenueService(response.result);
    };
  
    const fetchRevenueService1 = async (startDate, endDate, page, pageSize) => {
        const response = await axios.get('/revenue/service-revenue', {
            params: {
                startDate: new Date(new Date().setDate(new Date().getDate() - startDate)).toLocaleDateString('vi-VN'),
                endDate: new Date(new Date().setDate(new Date().getDate() - endDate)).toLocaleDateString('vi-VN'),
                page,
                pageSize,
            }
        });
        setRevenueService1(response.result);
        setPagination({
            current: response.result.currentPage,
            pageSize: response.result.pageSize,
            total: response.result.totalElements,
        });
    };

    const fetchRevenueRoomType = async (startDate, endDate) => {
        const response = await axios.get('/revenue/room-type-revenue', {params: {
            startDate: new Date(new Date().setDate(new Date().getDate() - startDate)).toLocaleDateString('vi-VN'),
            endDate: new Date(new Date().setDate(new Date().getDate() - endDate)).toLocaleDateString('vi-VN'),
            size: 3
        }});
        setRevenueRoomType(response.result);
    };
   
    const fetchRevenueRoomType1 = async (startDate, endDate) => {
        const response = await axios.get('/revenue/room-type-revenue', {params: {
            startDate: new Date(new Date().setDate(new Date().getDate() - startDate)).toLocaleDateString('vi-VN'),
            endDate: new Date(new Date().setDate(new Date().getDate() - endDate)).toLocaleDateString('vi-VN'),
        }});
        setRevenueRoomType1(response.result);
    };

    const [billTicket, setBillTicket] = useState([]);
    const [billRoom, setBillRoom] = useState([]);

    const fetchBillTicket = async (page,pageSize) =>{
        const billTicket = await axios.get('/bill-ticket',{
            params:{
                page,
                pageSize,
            }
        })
        setBillTicket(billTicket.result.data);
        setPaginationBillTicket({
            current: billTicket.result.currentPage,
            pageSize: billTicket.result.pageSize,
            total: billTicket.result.totalElements,
        })
    }

    const fetchSelectedBillTicketDetail = async (bill) => {
        const response = await axios.get(`/bill-ticket-detail/get-by-bill-simple/${bill.id}`);
        return response.result;
    }
    
    const columnsTicket = [
        { title: "ID",render: (record) => `${record.id.slice(0, 6)}...`},
        { title: "Thông tin khách hàng",render: (record) =>
             <div style={{ display: "flex", alignItems: "center" }}>
                <img src={record.user?.avatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }} />
                <span>{record.user?.username}</span>
            </div> 
        },
        { title: "Số điện thoại", render: (record) => record.user.phoneNumber },
        { title: "Loại khách hàng", render: (record) => Array.isArray(record.user.customerType) ? record.user.customerType.map((type) => type.name).join(", ") : record.user.customerType?.name || "N/A" },
        { title: "Ngày đặt", render: (record) => {
            const date = new Date(record.dateCreated);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }},
        {title:'Tổng tiền',render:(record)=>record.total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})},
        { 
            title: "Trạng thái", 
            render: (record) => {
                let color;
                switch (record.status.toLowerCase()) {
                    case 'đã thanh toán':
                        color = 'green';
                        break;
                    case 'đã huỷ':
                        color = 'red';
                        break;
                    case 'chưa thanh toán':
                        color = 'orange';
                        break;
                    default:
                        color = 'black';
                }
                return <span style={{ color, fontWeight: 'bold' }}>{record.status.toUpperCase()}</span>;
            }
        },
        { 
            title: 'Chi tiết',
            render: (record) => (
                <div 
                    style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center', display: 'flex' }}
                >
                    <EyeOutlined 
                        onClick={async () => {
                            const response = await fetchSelectedBillTicketDetail(record);
                            if (response) {
                                showModal(
                                <Table
                                    dataSource={response}
                                    columns={ServiceDetailColumns}
                                    pagination={false}
                                />,
                                { width: 1200, height: 600 }
                                );
                            }
                        }}/>
                </div>
            ),
        },
    ];
    const fetchBillRoom = async (page,pageSize) =>{
        const billRoom = await axios.get('/booking_room',{
            params:{
                page,pageSize
            }
        });
        setBillRoom(billRoom.result.data);
        setPaginationBillRoom({
            current: billRoom.result.currentPage,
            pageSize: billRoom.result.pageSize,
            total: billRoom.result.totalElements
        })
    }

    const fetchSelectedBillRoomDetail = async (bookingRoom) => {
        const response = await axios.get(`/booking_room_details/byBookingRoom/byStaff/${bookingRoom.id}`);
        return response.result;
        
    }
    const columnsRoom = [
        { title: 'ID', render: (record) => `${record.id.slice(0, 6)}...`},
        {
            title: "Thông tin khách hàng",
            render: (record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={record.user.avatar}
                  alt="Avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 11 }}
                />
                <span>{record.user.username}</span>
              </div>
            ),
        },
        { title: 'Số điện thoại', render:(record) => record.user.phoneNumber},
        { title: 'Loại khách hàng', render:(record)=>record.user.customerType.name},
        { title: 'Ngày đặt', render:(record) => {
            const date = new Date(record.checkInDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }},
        {title:'Tổng tiền',render:(record)=>record.total.toLocaleString('vi-VN',{style:'currency',currency:'VND'})},
        { 
            title: "Trạng thái", 
            render: (record) => {
                let color;
                switch (record.status.toLowerCase()) {
                    case 'đã thanh toán':
                        color = 'green';
                        break;
                    case 'đã huỷ':
                    case 'đã hủy':
                        color = 'red';
                        break;
                    case 'chưa thanh toán':
                        color = 'orange';
                        break;
                    default:
                        color = 'black';
                }
                return <span style={{ color, fontWeight: 'bold' }}>{record.status.toUpperCase()}</span>;
            }
        },
        { 
            title: 'Chi tiết', 
            render: (record) => (
                <div 
                    style={{ cursor: 'pointer', fontSize: '20px', color: '#f42929', justifyContent: 'center', display: 'flex' }}
                >
                    <EyeOutlined 
                        onClick={async () => {
                            const response = await fetchSelectedBillRoomDetail(record);
                            if (response) {
                                showModal(
                                <Table
                                    dataSource={response}
                                    columns={RoomDetailColumns}
                                    pagination={false}
                                />,
                                { width: 1200, height: 600 }
                                );
                            }
                        }}/>
                </div>
            ),
        },
    ];

    const showModal = (content, size = {}, type = null) => {
        setTableContent(content);
        setModalContent(content);
        setModalType(type);
        setIsModalVisible(true);
        setModalSize(size);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        fetchRevenueService1(
            selectedTimeRange.startDate,
            selectedTimeRange.endDate,
            pagination.current,
            pagination.pageSize
        );
    };
    
    return (
        <Container>
            <DashboardContainer>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Doanh thu</div>
                    <Header>
                        <HeaderItem>Trang chủ</HeaderItem>
                        <p>→</p>
                        <HeaderItem>Doanh thu</HeaderItem>
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
                            <ChartTitle>Hotel Room</ChartTitle>
                            <NumberStyle>{revenueCurrentMonth.rooms?.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</NumberStyle>
                        </div>
                        <div>
                            <HomeIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={revenueCurrentMonth.rooms > revenueData[revenueData.length - 2]?.rooms}>
                            {revenueCurrentMonth.rooms > revenueData[revenueData.length - 2]?.rooms ? <RiseOutlined /> : <FallOutlined />}
                            <div>{((revenueCurrentMonth.rooms - revenueData[revenueData.length - 2]?.rooms) / revenueData[revenueData.length - 2]?.rooms * 100).toFixed(2)}%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={revenueData}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="rooms" stroke="#000000" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ChartLine>
                </ChartItem>

                <ChartItem style={{ backgroundColor: '#9df8cc' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Tickets</ChartTitle>
                            <NumberStyle>{revenueCurrentMonth.tickets?.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</NumberStyle>
                        </div>
                        <div>
                            <BookIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={revenueCurrentMonth.tickets > revenueData[revenueData.length - 2]?.tickets}>
                            {revenueCurrentMonth.tickets > revenueData[revenueData.length - 2]?.tickets ? <RiseOutlined /> : <FallOutlined />}
                            <div>{((revenueCurrentMonth.tickets - revenueData[revenueData.length - 2]?.tickets) / revenueData[revenueData.length - 2]?.tickets * 100).toFixed(2)}%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={revenueData}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="tickets" stroke="#000000" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ChartLine>
                </ChartItem>
                
                <ChartItem style={{ backgroundColor: '#ddddfc' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Number Of Bill Created</ChartTitle>
                            <NumberStyle>{revenueCurrentMonth.numOfBill}</NumberStyle>
                        </div>
                        <div>
                            <UserIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={revenueCurrentMonth.numOfBill > revenueData[revenueData.length - 2]?.numOfBill}>
                            {revenueCurrentMonth.numOfBill > revenueData[revenueData.length - 2]?.numOfBill ? <RiseOutlined /> : <FallOutlined />}
                            <div>{((revenueCurrentMonth.numOfBill - revenueData[revenueData.length - 2]?.numOfBill) / revenueData[revenueData.length - 2]?.numOfBill * 100).toFixed(2)}%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={revenueData}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="numOfBill" stroke="#000000" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ChartLine>
                </ChartItem>
                
                <ChartItem style={{ backgroundColor: '#ffc6ff' }}>
                    <ChartItemContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ChartTitle>Total Revenue</ChartTitle>
                            <NumberStyle>{revenueCurrentMonth.totalRevenue?.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</NumberStyle>
                        </div>
                        <div>
                            <DollarIcon />
                        </div>
                    </ChartItemContainer>
                    <ChartFooter>
                        <Percent increase={revenueCurrentMonth.totalRevenue > revenueData[revenueData.length - 2]?.totalRevenue}>
                            {revenueCurrentMonth.totalRevenue > revenueData[revenueData.length - 2]?.totalRevenue ? <RiseOutlined /> : <FallOutlined />}
                            <div>{((revenueCurrentMonth.totalRevenue - revenueData[revenueData.length - 2]?.totalRevenue) / revenueData[revenueData.length - 2]?.totalRevenue * 100).toFixed(2)}%</div>
                        </Percent>
                        <div style={{ color: '#999' }}>Last Month</div>
                    </ChartFooter>
                    <ChartLine>
                        <LineChart width={220} height={90} data={revenueData}>
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="totalRevenue" stroke="#000000" activeDot={{ r: 8 }} />
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
                            <DateStyle>Last 5 Months</DateStyle>
                        </div>
                    </DashboardContainer>
                    <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e5e5' }}>
                        <Revenue>
                            <LineChart width={900} height={350} data={revenueData.map(data => ({
                                ...data,
                                rooms: data.rooms / 1000,
                                tickets: data.tickets / 1000,
                                totalRevenue: data.totalRevenue / 1000,
                            }))}>
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => `${value}k VND`} />
                                <Legend />
                                <Line type="monotone" dataKey="rooms" stroke="#8884d8" name="Hotel Room" />
                                <Line type="monotone" dataKey="tickets" stroke="#82ca9d" name="Tickets" />
                                <Line type="monotone" dataKey="totalRevenue" stroke="#ff7300" name="Total Revenue" />
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
                                        <PopoverItem onClick={() => {
                                            setSelectedTimeRange({ startDate: 30, endDate: 0 });
                                            fetchRevenueService(30, 0);
                                            fetchRevenueService1(30, 0, 1, pagination.pageSize);
                                        }}>Last 30 days</PopoverItem>
                                        <PopoverItem onClick={() => {
                                            setSelectedTimeRange({ startDate: 60, endDate: 30 });
                                            fetchRevenueService(60, 30);
                                            fetchRevenueService1(60, 30, 1, pagination.pageSize);
                                        }}>Last month</PopoverItem>
                                        <PopoverItem onClick={() => {
                                            setSelectedTimeRange({ startDate: 365, endDate: 0 });
                                            fetchRevenueService(365, 0);
                                            fetchRevenueService1(365, 0, 1, pagination.pageSize);
                                        }}>Last year</PopoverItem>
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
                                    onClick={() => 
                                        showModal(
                                        <Table
                                            dataSource={revenueService1.data} 
                                            columns={viewServiceColumns}
                                            pagination={{
                                                pageSize: pagination.pageSize,
                                                current: pagination.current,
                                                total: pagination.total,
                                            }}
                                            rowKey='id' 
                                            onChange={handleTableChange}
                                        />,
                                        { width: 1000, height: 650 },
                                        'service'
                                    )}
                                >
                                    View →
                                </ViewStyle>
                            </div>
                            
                            {revenueService?.data?.map((data) => (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                        <div style={{ display: 'flex' }}>
                                            <ImgService src={`${data.serviceEntity.image}`} />
                                            <div>
                                                <div style={{ marginRight: '10px' }}>{data.serviceEntity?.name}</div>
                                                <div style={{ color: '#999', fontSize: '13px' }}> {data.serviceType?.name}</div>
                                            </div>
                                        </div>
                                        <div style={{ gap: '5px', display: 'flex', alignItems: 'center' }}><div>{data.revenue.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div></div>
                                    </div>
                                    <ProgressBar value={data.revenue / revenueService.data[0].revenue * 100}  />
                                </div>
                            ))}
                        </div>
                    </div>
                </RevenueContainerRight>
            </RevenueContainer>

            <RevenueContainer>
                <BookingContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ padding: '20px 20px 0 20px' }}>
                            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>{showHistoryTicket ? 'Lịch sử đặt vé' : <div>Lịch sử đặt phòng</div>}</div>
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
                                dataSource={billTicket}
                                columns={columnsTicket}
                                pagination={{
                                    pageSize: paginationBillTicket.pageSize,
                                    current: paginationBillTicket.current,
                                    total: paginationBillTicket.total
                                }}
                                onChange={(pagination) =>
                                    fetchBillTicket(pagination.current, pagination.pageSize)
                                }
                            />}
                            {showHistoryRoom && <Table
                                dataSource={billRoom}
                                columns={columnsRoom}
                                pagination={{
                                    pageSize: paginationBillRoom.pageSize,
                                    current: paginationBillRoom.current,
                                    total: paginationBillRoom.total
                                }}
                                onChange={(pagination) =>
                                    fetchBillRoom(pagination.current, pagination.pageSize)
                                }
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
                                        <PopoverItem onClick={() => {
                                            fetchRevenueRoomType(30,0);
                                            fetchRevenueRoomType1(30,0);
                                        }}>Last 30 days</PopoverItem>
                                        <PopoverItem onClick={() => {
                                            fetchRevenueRoomType(60,30);
                                            fetchRevenueRoomType1(60,30);
                                        }}>Last month</PopoverItem>
                                        <PopoverItem onClick={() => {
                                            fetchRevenueRoomType(365,0);
                                            fetchRevenueRoomType1(365,0);
                                        }}>Last year</PopoverItem>
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
                                        dataSource={revenueRoomType1.data}
                                        columns={viewRoomColumns}
                                    />,
                                    { width: 1200, height: 600 },
                                    'room'
                                )}
                                >       
                                    View →
                                </ViewStyle>
                            </div>
                            {revenueRoomType?.data?.map((data) => (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                        <div style={{ display: 'flex' }}>
                                            <ImgService src={`${data.roomType.image}`} />
                                            <div>
                                                <div style={{ marginRight: '10px' }}>{data.roomType?.name}</div>
                                            </div>
                                        </div>
                                        <div style={{ gap: '5px', display: 'flex', alignItems: 'center' }}><div>{data.revenue.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</div></div>
                                    </div>
                                    <ProgressBar value={data.revenue / revenueRoomType.data[0].revenue * 100}  />
                                </div>
                            ))}
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