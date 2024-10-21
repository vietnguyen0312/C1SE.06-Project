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
const historyBookingRoom = [
    {
        id: 1,
        checkInDate: "2024-02-02",
        checkOutDate: "2024-02-03",
        soNgayThue: 1,
        status: "Đã thanh toán",
        bookingRooms: [
            {
                id: 1,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status:"Đang hoạt động",    
                roomTypePrice: 100000,
            },
            {
                id: 2,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status:"Đang hoạt động",
                roomTypePrice: 100000,
            },
            {
                id: 3,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status:"Đang hoạt động",
                roomTypePrice: 100000,
            },
        ]
    },
    {
        id: 2,
        checkInDate: "2024-03-15",
        checkOutDate: "2024-03-16",
        soNgayThue: 1,
        status: "Chưa thanh toán",
        bookingRooms: [
            {
                id: 1,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status:"Đang hoạt động",
                roomTypePrice: 100000,
            },
            {
                id: 2,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status:"Đang hoạt động",
                roomTypePrice: 100000,
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
const calculateTotal = (bookingRooms) => {
    return bookingRooms.reduce((total, bookingRoom) => {
        return total + bookingRoom.roomTypePrice;
    }, 0);
};


const HistoryBookingRoom = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingRoom, setSelectedBookingRoom] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [tempRating, setTempRating] = useState(0);
    const [tempReview, setTempReview] = useState('');
    const [bookingRoomRatings, setBookingRoomRatings] = useState({});
    const maxWords = 300
    const [hoverRating, setHoverRating] = useState(0); 

    const handleOpenModal = (bookingRoom) => {
        setSelectedBookingRoom(bookingRoom);
        setTempRating(bookingRoomRatings[bookingRoom.id] || 0);
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
        if (selectedBookingRoom && tempRating > 0) {
            setRating(tempRating);
            setTempRating(0);
            setTempReview('');
            setBookingRoomRatings((prev) => ({ ...prev, [selectedBookingRoom.id]: tempRating }));
            handleCloseModal();
            console.log('Success', tempRating, tempReview);
        } else {
            console.error('Error: Rating submission failed');
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
                            <Title>Lịch sử đặt phòng</Title>
                        </AboutContent>
                    </Row>
                </Container>
            </BannerSectionTicket>
            {historyBookingRoom.map((item) => (
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
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Ngày đặt: {item.checkInDate}</div>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Ngày trả: {item.checkOutDate}</div>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Số ngày thuê: {item.soNgayThue}</div>
                                    <div><FaCircle style={{ color: "#84b0ca" }} /> Trạng thái: <Status>{item.status}</Status></div>
                                </InfoRight>
                            </Infomation>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className='marginLeft'>STT</th>
                                        <th>Tên Phòng</th>
                                        <th className='center'>Số Lượng Người</th>
                                        <th className='center'>Trạng thái</th>
                                        <th className='center'>Giá</th>
                                        {item.status === "Đã thanh toán" && (
                                            <th className='center'>Đánh giá</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.bookingRooms.map((bookingRoom, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <img src={bookingRoom.img} alt={bookingRoom.roomTypeName} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                                                    <div>
                                                        {bookingRoom.roomTypeName}
                                                        <div style={{ fontSize: '13px', color: '#7e8d9f' }}>Phòng: {bookingRoom.roomNumber}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='center'>{bookingRoom.numberPeople}</td>
                                            <td className='center'>{bookingRoom.status}</td>
                                            <td className='center'>{bookingRoom.roomTypePrice.toLocaleString()} VNĐ</td>
                                            {item.status === "Đã thanh toán" && (
                                                <td className='center'>
                                                    <RateService>
                                                        <ButtonCPN text="Đánh giá" onClick={() => handleOpenModal(bookingRoom)} style={{ width: '110px', height: '30px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                            <div style={{ color: 'red' }}>Vui lòng thanh toán để sử dụng phòng</div>
                                        ) : (
                                            <div style={{ color: 'green' }}>Cảm ơn bạn đã thanh toán</div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                    {item.status === "Đã thanh toán" ? (
                                        <div style={{ color: 'green' }}>
                                            <TotalText>Tổng tiền: {calculateTotal(item.bookingRooms).toLocaleString()} VNĐ</TotalText>
                                        </div>
                                    ) : (
                                        <div style={{ color: 'red' }}>
                                            <TotalText>Tổng tiền: {calculateTotal(item.bookingRooms).toLocaleString()} VNĐ</TotalText>
                                        </div>
                                    )}
                                    {item.status === "Chưa thanh toán" && (
                                        <ButtonCPN text="Đặt phòng" onClick={() => handleOpenModal(item)} />
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
                    {selectedBookingRoom && (
                        <>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
                                <img src={selectedBookingRoom.img} alt={selectedBookingRoom.roomTypeName} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                                <div>
                                    {selectedBookingRoom.roomTypeName}
                                    <div style={{ fontSize: '13px', color: '#7e8d9f' }}>{selectedBookingRoom.roomNumber}</div>
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
                                <div style={{ display: 'flex', gap: '5px', userSelect: 'none' }}>
                                    {bookingRoomRatings[selectedBookingRoom?.id] ? (
                                        <p style={{ color: 'green' }}>Cảm ơn bạn đã đánh giá phòng này</p>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '5px' }}>Đánh giá phòng này <p style={{ color: 'red' }}>*</p></div>
                                    )}
                                </div>
                            </WriteRating>
                            <div>Viết đánh giá</div>
                            <TextAreaWrapper>
                                <textarea
                                    placeholder="Hãy chia sẻ cảm nhận của bạn về phòng này với chúng tôi."
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
                        disabled={!selectedBookingRoom || bookingRoomRatings[selectedBookingRoom?.id]}
                    />
                    <ButtonCPN
                        text="Gửi"
                        onClick={handleSubmitRating}
                        style={{ width: '80px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={!selectedBookingRoom || bookingRoomRatings[selectedBookingRoom?.id] || tempRating === 0} // Disable if no rating is given
                    />
                </ModalFooter>
            </ModalWrapper>
        </>
    );
};

export default HistoryBookingRoom;
