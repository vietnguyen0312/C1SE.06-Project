import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaCircle } from "react-icons/fa";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import ButtonCPN from '../../../components/Button/Button';
import { ModalTitle, ModalWrapper, ModalHeader, ModalBody, ModalFooter, WriteRating } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ReactRating from 'react-rating';

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
        padding: 16px;
    }
    tbody tr:nth-child(even) {
        background-color: #f2f2f2;
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
`;
const Infomation = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
 `
const Price = styled.div`
    display: flex;
    justify-content: space-between;
    margin:30px 0;
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

const RateService = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const StarIcon = styled(FontAwesomeIcon)`
    font-size: 25px; 
`;

const TextAreaWrapper = styled.div`
    margin-top: 10px;
    position: relative;
`;

const WordCount = styled.div`
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    color: #999;
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
                id: 1,
                img: '/img/service/i1.jpg',
                serviceName: 'Công viên nước',
                serviceType: 'Vui chơi',
                quantityNguoiLon: 2,
                quantityChildrenBelow1m: 4,
                quantityChildrenFrom1mTo1_3m: 5,
                price: 100000,
            },
            {
                id: 2,
                img: '/img/service/i5.jpg',
                serviceName: 'Trượt thác',
                serviceType: 'Giải trí',
                quantityNguoiLon: 1,
                quantityChildrenFrom1mTo1_3m: 1,
                price: 150000,
            },
            {
                id: 3,
                img: '/img/service/Buffet.jpg',
                serviceName: 'Buffer',
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
                id: 1,
                img: '/img/service/i1.jpg',
                serviceName: 'Công viên nước',
                serviceType: 'Vui chơi',
                quantityNguoiLon: 3,
                quantityChildrenFrom1mTo1_3m: 2,
                price: 120000,
            },
            {
                id: 2,
                img: '/img/service/i5.jpg',
                serviceName: 'Trượt thác',
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
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [tempRating, setTempRating] = useState(0);
    const [tempReview, setTempReview] = useState('');
    const [serviceRatings, setServiceRatings] = useState({});
    const maxWords = 300
    const [hoverRating, setHoverRating] = useState(0); 

    const handleOpenModal = (service) => {
        setSelectedService(service);
        setTempRating(serviceRatings[service.id] || 0);
        setHoverRating(0); 
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);

    };

    const handleCancel = () => {
        setTempRating(0);
        setTempReview('');
        setRating(0);
        handleCloseModal();
    };

    const handleSubmitRating = () => {
        if (selectedService && tempRating > 0) {
            setRating(tempRating);
            setTempRating(0);
            setTempReview('');
            setServiceRatings((prev) => ({ ...prev, [selectedService.id]: tempRating }));
            handleCloseModal();
            console.log('thanhcong', tempRating, tempReview);
        } else {
            console.error('deo dc');
        }
    };

    const handleReviewChange = (e) => {
        const words = e.target.value;
        if (words.length <= maxWords) {
            setTempReview(words);
        }
    };

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
                                        {item.status === "Đã thanh toán" && (
                                            <th className='center'>Đánh giá</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.services.map((service, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <img src={service.img} alt={service.serviceName} style={{ width: '50px', height: '50px', objectFit: 'cover',borderRadius:'10px',boxShadow:'0 0 10px 0 rgba(0, 0, 0, 0.1)',cursor:'pointer' }} />
                                                    <div>
                                                        {service.serviceName}
                                                        <div style={{ fontSize: '13px', color: '#7e8d9f' }}>{service.serviceType}</div>
                                                    </div>

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
                                            {item.status === "Đã thanh toán" && (
                                                <td className='center'>
                                                    <RateService>
                                                        <ButtonCPN text="Đánh giá" onClick={() => handleOpenModal(service)} style={{ width: '110px', height: '30px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                    </RateService>
                                                </td>
                                            )}
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
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                    {item.status === "Đã thanh toán" ? (
                                        <div style={{ color: 'green' }}>
                                            <TotalText>Tổng tiền: {calculateTotal(item.services).toLocaleString()} VNĐ</TotalText>
                                        </div>
                                    ) : (
                                        <div style={{ color: 'red' }}>
                                            <TotalText>Tổng tiền: {calculateTotal(item.services).toLocaleString()} VNĐ</TotalText>
                                        </div>
                                    )}
                                    {item.status === "Chưa thanh toán" && (
                                        <ButtonCPN text="Thanh toán" onClick={() => handleOpenModal(item)} />
                                    )}
                                </div>
                            </Price>
                        </Container1>
                    </HistoryBillContainer>
                </HistoryBill>
            ))}
            <ModalWrapper show={showModal} onHide={handleCloseModal} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Đánh giá dịch vụ</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {selectedService && (
                        <>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
                                <img src={selectedService.img} alt={selectedService.serviceName} style={{ width: '150px', height: '150px', objectFit: 'cover',borderRadius:'10px',boxShadow:'0 0 10px 0 rgba(0, 0, 0, 0.1)',cursor:'pointer' }} />
                                <div>
                                    {selectedService.serviceName}
                                    <div style={{ fontSize: '13px', color: '#7e8d9f' }}>{selectedService.serviceType}</div>
                                </div>
                            </div>
                            <WriteRating>
                                <ReactRating
                                    fractions={2}
                                    initialRating={tempRating} 
                                    onChange={(rate) => setTempRating(rate)}
                                    onHover={(rate) => setHoverRating(rate)}
                                    onMouseLeave={() => setHoverRating(0)} 
                                    emptySymbol={<StarIcon icon={faStar} color="#e4e5e9" />}
                                    fullSymbol={<StarIcon icon={faStar} color="#ffc107" />}
                                    placeholderSymbol={<StarIcon icon={faStarHalfAlt} color="#ffc107" />}
                                />
                                <div style={{ display: 'flex', gap: '5px',userSelect:'none' }}>
                                    {serviceRatings[selectedService?.id] ? (
                                        <p style={{ color: 'green' }}>Cảm ơn bạn đã đánh giá dịch vụ này</p>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '5px' }}>Đánh giá dịch vụ này <p style={{ color: 'red' }}>*</p></div>
                                    )}
                                </div>
                            </WriteRating>
                            <div>Viết đánh giá</div>
                            <TextAreaWrapper>
                                <textarea
                                    placeholder="Hãy chia sẻ cảm nhận của bạn về dịch vụ này với chúng tôi."
                                    style={{ width: '100%', height: '100px', border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px', marginTop: '10px' }}
                                    value={tempReview}
                                    onChange={handleReviewChange}
                                ></textarea>
                                <WordCount>{tempReview.length}/{maxWords}</WordCount>
                            </TextAreaWrapper>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <ButtonCPN
                        text="Huỷ"
                        onClick={handleCancel}
                        style={{ width: '80px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f5f5f', color: 'white' }}
                        disabled={!selectedService || serviceRatings[selectedService?.id]}
                    />
                    <ButtonCPN
                        text="Gửi"
                        onClick={handleSubmitRating}
                        style={{ width: '80px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={!selectedService || serviceRatings[selectedService?.id] || tempRating === 0} // Disable if no rating is given
                    />
                </ModalFooter>
            </ModalWrapper>
        </>
    );
};

export default HistoryTicketBill;
