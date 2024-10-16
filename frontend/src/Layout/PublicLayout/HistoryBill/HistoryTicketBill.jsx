import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaCircle } from "react-icons/fa";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import ButtonCPN from '../../../components/Button/Button';
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top:79px;
  
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const HistoryBill = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin:50px 50px 0 50px;
`;

const HistoryBillContainer = styled.div`
  padding: 20px;
`;

const Container1 = styled.div`
  margin-bottom: 3rem;
  margin-top: 1.5rem;
`;

const InvoiceText = styled.p`
  color: #7e8d9f;
  font-size: 20px;
`;


const Table = styled.table`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  border-collapse: collapse;
  
  thead {
    background-color: #84b0ca;
    color: white;
  }

 td,th{
    padding: 10px;
 }
  tbody tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  tbody td:hover {
    cursor: pointer;
  }
  .center{
    text-align: center;
  }
  .marginLeft{
    margin-left: 10px;
  }
`;


const TotalText = styled.p`
  font-size: 20px;
  color: red;
  font-weight: bold;
`;
const Infomation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 100px 0 0;
 `
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin:30px 100px 0 0;
`;
const Status = styled.span`
    color: white;
    font-weight: bold;
    background-color: #ffc107;
    padding: 5px 10px;
    border-radius: 5px;
`;


const Gender = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const InfomationLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InfoRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
export const BannerSectionTicket = styled.section`
    background-image: url('/img/header/h3.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 55vh;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    user-select: none;
    outline: none;
    
  `;
const historyBill = [
    {
        id: 1,
        datePayment: "2024-02-02",
        status: "Đã thanh toán",
        services: [
            {
                service: 'Công viên nước',
                serviceType: 'Vui chơi',
                quantityNguoiLon: 2,
                quantityChildrenBelow1m: 4,
                quantityChildrenFrom1mTo1_3m: 5,
                price: 100000,
            },
            {
                service: 'Trượt thác',
                serviceType: 'Giải trí',
                quantityNguoiLon: 1,
                quantityChildrenFrom1mTo1_3m: 1,
                price: 150000,
            },
            {
                service: 'Buffer',
                serviceType: 'Ăn uống',
                quantityNguoiLon: 1,
                price: 200000,
            },
        ]
    },
    {
        id: 2,
        datePayment: "2024-03-15",
        status: "Chưa thanh toán",
        services: [
            {
                service: 'Công viên nước',
                serviceType: 'Vui chơi',
                quantityNguoiLon: 3,
                quantityChildrenFrom1mTo1_3m: 2,
                price: 120000,
            },
            {
                service: 'Trượt thác',
                serviceType: 'Giải trí',
                quantityNguoiLon: 1,
                price: 150000,
            },
        ]
    },
];

const userInfo = {
    name: "Hoang Nghia Quyen",
    gender: "Male",
    phone: "123-456-789",
    customerType: "VIP"
};
const calculateTotal = (services) => {
    return services.reduce((total, service) => {
        const adultTotal = (service.quantityNguoiLon || 0) * service.price;
        const childrenBelow1mTotal = (service.quantityChildrenBelow1m || 0) * 0;
        const childrenFrom1mTo1_3mTotal = (service.quantityChildrenFrom1mTo1_3m || 0) * (service.price / 2);
        return total + adultTotal + childrenBelow1mTotal + childrenFrom1mTo1_3mTotal;
    }, 0);
};


const HistoryTicketBill = () => {

    return (
        <>
            <BannerSectionTicket >
                <Overlay />
                <Container>
                    <Row>
                        <AboutContent>
                            <Title>Lịch sử đặt vé</Title>
                        </AboutContent>
                    </Row>
                </Container>
            </BannerSectionTicket>
            {historyBill.map((item) => (
                <HistoryBill key={item.id}>
                    <HistoryBillContainer>
                        <Container1>
                            <div>
                                <InvoiceText>
                                    Hoá Đơn: <strong>#{item.id}</strong>
                                </InvoiceText>
                            </div>
                            <hr />
                            <Infomation>
                                <InfomationLeft>
                                    <span style={{ color: "#5d9fc5" }}>{userInfo.name}</span>
                                    <Gender>
                                        Giới tính:
                                        {userInfo.gender === 'Female' ? (
                                            <FemaleIcon style={{ color: 'pink', marginLeft: '5px' }} />
                                        ) : (
                                            <MaleIcon style={{ color: 'blue', marginLeft: '5px' }} />
                                        )}
                                    </Gender>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        Thành viên: <div style={{ color: "#5d9fc5" }}>{userInfo.customerType}</div>
                                    </div>
                                    <div><FaPhone /> {userInfo.phone}</div>
                                </InfomationLeft>
                                <InfoRight>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> ID: #{item.id}</div>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Ngày đặt: {item.datePayment}</div>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Trạng thái: <Status>{item.status}</Status></div>
                                </InfoRight>
                            </Infomation>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className='marginLeft'>STT</th>
                                        <th>Tên Dịch Vụ</th>
                                        <th>Loại Vé</th>
                                        <th className='center'>Số Lượng</th>
                                        <th className='center'>Đơn Giá</th>
                                        <th className='center'>Thành Tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.services.map((service, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {service.service}
                                                <div style={{ fontSize: '13px', color: '#7e8d9f' }}>
                                                    {service.serviceType}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                    {service.quantityNguoiLon > 0 && (
                                                        <div>Người lớn</div>
                                                    )}

                                                    {service.quantityChildrenFrom1mTo1_3m > 0 && (
                                                        <div>Trẻ em từ 1m đến 1.3m</div>
                                                    )}
                                                    {service.quantityChildrenBelow1m > 0 && (
                                                        <div>Trẻ em dưới 1m</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className='center'>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                    {service.quantityNguoiLon > 0 && (
                                                        <div>{service.quantityNguoiLon}</div>
                                                    )}
                                                    {service.quantityChildrenFrom1mTo1_3m > 0 && (
                                                        <div>{service.quantityChildrenFrom1mTo1_3m}</div>
                                                    )}
                                                    {service.quantityChildrenBelow1m > 0 && (
                                                        <div>{service.quantityChildrenBelow1m}</div>
                                                    )}

                                                </div>
                                            </td>
                                            <td className='center'>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                    {service.quantityNguoiLon > 0 && (
                                                        <div>{service.price.toLocaleString()} VNĐ</div>
                                                    )}
                                                    {service.quantityChildrenFrom1mTo1_3m > 0 && (
                                                        <div>{(service.price / 2).toLocaleString()} VNĐ</div>
                                                    )}
                                                    {service.quantityChildrenBelow1m > 0 && (
                                                        <div>0</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className='center'>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                    {service.quantityNguoiLon > 0 && (
                                                        <div>{(service.quantityNguoiLon * service.price).toLocaleString()} VNĐ</div>
                                                    )}
                                                    {service.quantityChildrenFrom1mTo1_3m > 0 && (
                                                        <div>{(service.quantityChildrenFrom1mTo1_3m * (service.price / 2)).toLocaleString()} VNĐ</div>
                                                    )}
                                                    {service.quantityChildrenBelow1m > 0 && (
                                                        <div>0</div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <hr />
                            <Price>
                                <div>
                                    <div>
                                        {item.status === "Chưa thanh toán" ? (
                                            <div style={{ color: 'red' }}>Vui lòng thanh toán để sử dụng dịch vụ</div>
                                        ) : (
                                            <div style={{ color: 'green' }}>Cảm ơn bạn đã thanh toán</div>
                                        )}
                                    </div>
                                </div>
                                <div style={{display: "flex", alignItems: "center",flexDirection: "column"}}>
                                    <TotalText>Tổng tiền: {calculateTotal(item.services).toLocaleString()} VNĐ</TotalText>
                                    {item.status === "Chưa thanh toán" && (
                                        <ButtonCPN text="Thanh toán" />
                                    )}
                                </div>
                            </Price>
                        </Container1>
                    </HistoryBillContainer>
                </HistoryBill>
            ))}
        </>
    );
};

export default HistoryTicketBill;