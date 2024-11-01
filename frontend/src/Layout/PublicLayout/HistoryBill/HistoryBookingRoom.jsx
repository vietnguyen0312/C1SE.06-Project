import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FaPhone, FaCircle } from "react-icons/fa";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import ButtonCPN from '../../../components/Button/Button';
import { ModalTitle, ModalWrapper, ModalHeader, ModalBody, ModalFooter, WriteRating, TableExtend } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ReactRating from 'react-rating';
import axios from '../../../Configuration/AxiosConfig';
import AOS from 'aos';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import InfiniteScroll from 'react-infinite-scroll-component';


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
    margin-top: 27px;
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
                status: "Đang hoạt động",
                roomTypePrice: 100000,
            },
            {
                id: 2,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status: "Đang hoạt động",
                roomTypePrice: 100000,
            },
            {
                id: 3,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status: "Đang hoạt động",
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
                status: "Đang hoạt động",
                roomTypePrice: 100000,
            },
            {
                id: 2,
                img: '/img/hotels/room_type/coupleRoom.jpg',
                roomTypeName: 'Standard',
                roomNumber: 101,
                numberPeople: 2,
                status: "Đang hoạt động",
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

const renderRateServiceButton = (bookingRoomDetail, color, text, handleOpenModal) => (
    <RateService>
        <ButtonCPN
            text={text}
            onClick={() => handleOpenModal(bookingRoomDetail)}
            style={{
                width: '125px',
                height: '30px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color,

            }}
        />
    </RateService>
);

const DatePickerContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 2px solid #f8b600;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 250px;

  &:focus {
    border-color: #000;
    max-width: 250px;
  }
`;

const HistoryBookingRoom = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedBookingRoomDetails, setselectedBookingRoomDetails] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [tempRating, setTempRating] = useState(0);
    const [tempReview, setTempReview] = useState('');
    const [bookingRoomRatings, setBookingRoomRatings] = useState({});
    const maxWords = 300
    const [hoverRating, setHoverRating] = useState(0);
    const [ListBookingRoom, setListBookingRoom] = useState([]);
    const [RateRoom, setRateRoom] = useState([]);
    const TongTien = [];
    const [initialRating, setInitialRating] = useState(0);
    const [initialReview, setInitialReview] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [user, setUser] = useState([]);
    const [bookingRoomDetails, setBookingRoomDetails] = useState([]);
    const [page, setPage] = useState(1);
    const lastPostElementRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 2000 });
        // Đây là hàm chạy đầu tiên khi component được mount

        GetHistoryBookingRoom();
        GetRateRoom();
    }, []);

    const setupObserver = useCallback(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                // this.fetchRoom(this.startDate, this.state.roomId);
                GetHistoryBookingRoom();
                // console.log("Phần tử cuối đã xuất hiện, tải thêm dữ liệu..."); // Kiểm tra log khi phần tử cuối cùng xuất hiện
            }
        });

        if (lastPostElementRef.current) {
            observer.observe(lastPostElementRef.current); // Quan sát phần tử cuối cùng
            // console.log("Đã thiết lập quan sát cho phần tử cuối cùng");
        }
    },);

    useEffect(() => {
        GetHistoryBookingRoom();
    }, [currentPage, pageSize]);

    const updateTongTien = (id, price) => {
        const existing = TongTien.find(item => item.id === id);
        if (existing) {
            // Cập nhật tổng tiền nếu đã tồn tại
            TongTien.forEach(item => {
                if (item.id === id) {
                    item.tongtien += price;
                }
            });
        } else {
            // Thêm mới nếu chưa tồn tại
            TongTien.push({ id, tongtien: price });
        }
    };

    const GetRateRoom = async () => {
        const response = await axios.get('/rate-room/user')

        setRateRoom(response.result)

    }

    const GetHistoryBookingRoom = async () => {
        const params = { page: currentPage, size: pageSize };

        const response = await axios.get('/users/myInfo');

        setUser(response.result)
        const Id = response.result.id
        const response1 = await axios.get(`/booking_room_details/byUser/page/${Id}`, { params })
        console.log(response1)
        const hasMore = response1.result.currentPage < response1.result.totalPages; // Điều kiện kiểm tra trang
        console.log(`Current Page: ${response1.result.currentPage}, Total Pages: ${response1.result.totalPages}, Has More: ${hasMore}`);
        const nextPage = hasMore ? page + 1 : page;
        console.log(nextPage)
        setListBookingRoom([...ListBookingRoom, ...response1.result.data]);
        setTotalElements(response1.result.totalElements);
        setTotalPages(Math.ceil(response1.result.totalElements / pageSize));


    }

    const updateRateRoom = async (rateRoom) => {

        const response = await axios.put(`/rate-room/${rateRoom.id}`, {
            score: tempRating,
            comment: tempReview,
            dateUpdate: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z'
        });
        // Update the RateRoom state with the new data
        setRateRoom((prev) => prev.map(item =>
            item.bookingRoomDetails.id === selectedBookingRoomDetails.id ? { ...item, ...response.result } : item
        ));

        toast.success('Cập nhật đánh giá phòng thành công')
    };

    const handleCancelBookingRoom = async (bookingRoomDetail) => {
        const checkInDate = moment(bookingRoomDetail.bookingRoom.checkInDate);
        const now = moment();

        // Check if the check-in date is more than one day from now
        if (checkInDate.diff(now, 'days') < 1) {
            toast.info("Không thể hủy đặt phòng vì ngày check-in còn hơn 1 ngày.");
            return;
        }

        const userConfirmed = window.confirm("Bạn có muốn hủy đặt phòng không?");
        if (userConfirmed) {
            await axios.put(`/booking_room_details/${bookingRoomDetail.id}`, {
                roomId: bookingRoomDetail.room.id,
                bookingId: bookingRoomDetail.bookingRoom.id,
                price: bookingRoomDetail.price,
                checkOuted: bookingRoomDetail.checkOuted,
                checkIned: bookingRoomDetail.checkIned,
                status: "đã hủy"
            });
            setBookingRoomDetails(prevDetails => [
                ...prevDetails,
                bookingRoomDetail.id // Adding the id to the details list
            ]);
            toast.success("Hủy đặt phòng thành công")
        }
    };

    const handleOpenModal = (bookingRoomDetail) => {
        const existingRateRoom = RateRoom.find(item => item.bookingRoomDetails.id === bookingRoomDetail.id);

        if (existingRateRoom) {
            setTempRating(existingRateRoom.score || 0);
            setTempReview(existingRateRoom.comment || '');
        } else {
            setTempRating(0);
            setTempReview('');
        }

        setInitialRating(existingRateRoom ? existingRateRoom.score : 0);
        setInitialReview(existingRateRoom ? existingRateRoom.comment : '');

        setselectedBookingRoomDetails(bookingRoomDetail);
        setHoverRating(0);
        setShowModal(true);
    };

    const handleOpenModalUpdate = (bookingRoomDetail) => {
        setselectedBookingRoomDetails(bookingRoomDetail);
        setShowModalUpdate(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setShowModalUpdate(false);

    };

    const handleCancel = () => {
        setTempRating(0);
        setTempReview('');
        setRating(0);
        handleCloseModal();
    };

    const valueRateRoom = async (selectedBookingRoomDetails) => {

        const response = await axios.post(`/rate-room`, {
            score: tempRating,
            bookingRoomDetailsID: selectedBookingRoomDetails.id,
            comment: tempReview,
            dateUpdate: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z'

        })
        setRateRoom([...RateRoom, {
            ...response.result
        }])

        toast.success('Đánh giá phòng thành công')

    }

    const handleSubmitRating = async () => {
        if (selectedBookingRoomDetails && (tempRating !== initialRating || tempReview !== initialReview)) {
            // Tìm kiếm RateRoom đã tồn tại
            const rateRoom = RateRoom.find(item => item.bookingRoomDetails.id === selectedBookingRoomDetails.id);

            if (rateRoom) {

                await updateRateRoom(rateRoom);
            } else {

                await valueRateRoom(selectedBookingRoomDetails);
            }

            setRating(tempRating);
            setTempRating(0);
            setTempReview('');
            setBookingRoomRatings((prev) => ({ ...prev, [selectedBookingRoomDetails.id]: tempRating }));
            handleCloseModal();

        }
    };

    const handleReviewChange = (e) => {
        const words = e.target.value;
        if (words.length <= maxWords) {
            setTempReview(words);
        }
    };

    const checkTrangThai = (status = null, checkined, checkoued, checkout = null) => {
        const now = moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        // Kiểm tra nếu checkined là null hoặc undefined
        if (checkined == null && status === "đã thanh toán") {
            if (checkout < now) {
                return "phòng không dùng đến"
            }
            return "chờ khách check in";
        }

        if (checkined != null && checkoued == null) {
            if (checkout < now) {
                return "đã quá hạn";
            } else {
                return "đang sữ dụng";
            }
        }

        if (checkined != null && checkoued != null) {
            return "đã trả phòng";
        }


        if (status === "chưa thanh toán") {
            return status
        }

        if (status === "đã hủy") {
            return "hóa đơn đã hủy"
        }

        return "trạng thái không xác định";
    };

    const checkGhiChu = (checkInDate, checkoutDate) => {
        const checkIn = new Date(checkInDate);
        const checkout = new Date(checkoutDate);

        // So sánh năm, tháng và ngày
        if (
            checkIn.getFullYear() === checkout.getFullYear() &&
            checkIn.getMonth() === checkout.getMonth() &&
            checkIn.getDate() === checkout.getDate()
        ) {
            return "trong ngày.";
        } else {
            return "";
        }
    };

    const calculateDays = (start, end) => {


        if (moment.isMoment(start)) {
            start = start.toDate();
        }
        if (moment.isMoment(end)) {
            end = end.toDate();
        }


        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }

        // Kiểm tra xem đầu vào có hợp lệ không
        if (!(start instanceof Date) || isNaN(start.getTime())) {

            return 0; // Trả về 0 nếu start không hợp lệ
        }
        if (!(end instanceof Date) || isNaN(end.getTime())) {

            return 0; // Trả về 0 nếu end không hợp lệ
        }

        const diffInTime = end.getTime() - start.getTime();
        let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

        // Nếu diffInDays bằng 0, tính là 1 ngày
        if (diffInDays <= 0) {
            diffInDays = 1;
        }

        return diffInDays;
    };

    const getMinEndDate = () => {
        const now = moment();
        const noon = moment().hour(12).minute(0).second(0);

        if (now.isBefore(noon)) {
            return now.toDate();
        }

        return now.add(1, 'days').toDate();
    };

    const payment = async () => {

        const now = moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        const response1 = await axios.post('booking_room', {
            userId: user.id,
            checkInDate: startDate,
            checkOutDate: endDate,
            total: selectedBookingRoomDetails.room.roomType.price * calculateDays(startDate, endDate), // Sử dụng tổng cho nhóm
            datePay: now,
            status: 'chưa thanh toán'
        });
        const bookingRoomId = response1.result.id;

        await axios.post('booking_room_details', {
            roomId: selectedBookingRoomDetails.room.id, // Id phòng
            bookingId: bookingRoomId,
            price: selectedBookingRoomDetails.room.roomType.price * calculateDays(startDate, endDate),
            checkIned: now,
        });
        await axios.put(`/booking_room_details/${selectedBookingRoomDetails.id}`, {
            bookingId: selectedBookingRoomDetails.bookingRoom.id,
            roomId: selectedBookingRoomDetails.room.id,
            price: selectedBookingRoomDetails.price,
            checkOuted: now
        });

        const paymentUrl = await axios.get('/payment/vn-pay', {
            params: {
                amount: selectedBookingRoomDetails.room.roomType.price * calculateDays(startDate, endDate),
                orderInfo: `r${bookingRoomId}`
            }
        });
        window.location.href = paymentUrl.result;
    }

    const fetchData = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
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
                                    Thời Gian Thanh Toán: <strong>#{item.id}</strong>
                                </InvoiceText>
                            </div>
                            <hr />
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
                                        {item.status === "chưa thanh toán" ? (
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
            <InfiniteScroll
                dataLength={ListBookingRoom.length}
                next={fetchData}
                hasMore={currentPage < totalPages}
                loader={<h4>Loading...</h4>}

            >
                {Array.isArray(ListBookingRoom) && ListBookingRoom.map((item, index) => (
                    <HistoryBill key={index}>
                        <HistoryBillContainer>
                            <Container1>
                                <div>
                                    <InvoiceText>
                                        Thời Gian Thanh Toán: <strong>{item.key ? item.key : "Không có thông tin"}</strong>
                                    </InvoiceText>
                                </div>
                                <hr />
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

                                {Array.isArray(item.value) && item.value.map((subItem, subIndex) => (
                                    <div key={subItem.key.id}>
                                        <InvoiceText>
                                            Hoá Đơn: <strong>{subItem.key.id}</strong>
                                        </InvoiceText>
                                        <hr />
                                        <Infomation>
                                            <InfoRight>
                                                <div><FaCircle style={{ color: "#84b0ca" }} /> Ngày đặt: {new Date(subItem.key.checkInDate).toLocaleDateString()}</div>
                                                <div><FaCircle style={{ color: "#84b0ca" }} /> Ngày trả: {new Date(subItem.key.checkOutDate).toLocaleDateString()}</div>
                                                <div><FaCircle style={{ color: "#84b0ca" }} /> Số ngày thuê: {subItem.key.soNgayThue}</div>
                                                <div><FaCircle style={{ color: "#84b0ca" }} /> Trạng thái: <Status>{subItem.key.status}</Status></div>
                                            </InfoRight>
                                        </Infomation>

                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th className='marginLeft'>STT</th>
                                                    <th>Tên Phòng</th>
                                                    <th className='center'>Số Lượng Người</th>
                                                    <th className='center'>Trạng thái</th>
                                                    <th className='center'>Ghi chú</th>
                                                    <th className='center'>Thành tiền</th>
                                                    <th className='center'>
                                                        {subItem.key.status === "đã thanh toán" ? "Đánh giá" : "tạm tạm"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(subItem.value) && subItem.value.map((roomType, roomTypeIndex) => (
                                                    <>
                                                        <tr key={roomType.id}>
                                                            <td colSpan={7} style={{ fontWeight: 'bold', }}>
                                                                {roomType.key.name}({roomType.key.price}VNĐ/Ngày)
                                                            </td>
                                                        </tr>

                                                        {Array.isArray(roomType.value) && roomType.value.map((bookingRoomDetail, bookingRoomDetailIndex) => {
                                                            const isCancelled = bookingRoomDetail.status === "đã hủy";
                                                            const rowStyle = { textDecoration: isCancelled ? 'line-through' : 'none' };
                                                            const isLastRoom = bookingRoomDetailIndex === roomType.value.length - 1;

                                                            return (
                                                                <tr key={bookingRoomDetailIndex} ref={isLastRoom ? lastPostElementRef : null}>
                                                                    <td style={rowStyle}>{bookingRoomDetailIndex + 1}</td>
                                                                    <td style={rowStyle}>
                                                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                                            <img src={"/img/hotels/room_type/" + bookingRoomDetail.room.roomType.image} alt={bookingRoomDetail.room.roomType.image} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                                                                            <div>
                                                                                {bookingRoomDetail.roomTypeName}
                                                                                <div style={{ fontSize: '13px', color: '#7e8d9f' }}>Phòng: {bookingRoomDetail.room.roomNumber}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='center' style={rowStyle}>{bookingRoomDetail.numberPeople}</td>

                                                                    {(() => {
                                                                        const status = bookingRoomDetail.bookingRoom.status;
                                                                        const checkined = bookingRoomDetail.checkIned;
                                                                        const checkouted = bookingRoomDetail.checkOuted;
                                                                        const checkout = bookingRoomDetail.bookingRoom.checkOutDate;

                                                                        const trangThai = checkTrangThai(status, checkined, checkouted, checkout);

                                                                        return <td className='center' style={rowStyle}>{trangThai}</td>;
                                                                    })()}

                                                                    <td className='center' style={rowStyle}>{checkGhiChu(bookingRoomDetail.bookingRoom.checkInDate, bookingRoomDetail.bookingRoom.checkOutDate)}</td>

                                                                    <td className='center' style={rowStyle}>{bookingRoomDetail.room.roomType.price * calculateDays(bookingRoomDetail.bookingRoom.checkInDate, bookingRoomDetail.bookingRoom.checkOutDate)} VNĐ</td>

                                                                    {isCancelled && bookingRoomDetails.includes(bookingRoomDetail.id) ? (
                                                                        <td className='center' style={rowStyle}>đã hủy</td>
                                                                    ) : (
                                                                        (() => {
                                                                            const status = bookingRoomDetail.bookingRoom.status;
                                                                            const checkined = bookingRoomDetail.checkIned;
                                                                            const checkouted = bookingRoomDetail.checkOuted;
                                                                            const checkout = bookingRoomDetail.bookingRoom.checkOutDate;

                                                                            const trangThai = checkTrangThai(status, checkined, checkouted, checkout);

                                                                            if (trangThai === "đã trả phòng") {
                                                                                if (RateRoom.find(item => item.bookingRoomDetails.id === bookingRoomDetail.id)) {
                                                                                    return renderRateServiceButton(bookingRoomDetail, '#009452', 'đã đánh giá', handleOpenModal);
                                                                                }
                                                                                return renderRateServiceButton(bookingRoomDetail, '#ffff2c', 'Đánh giá', handleOpenModal);
                                                                            } else if (trangThai === "đã quá hạn") {
                                                                                return renderRateServiceButton(bookingRoomDetail, '#FF00FF', 'Gia hạn', handleOpenModalUpdate);
                                                                            } else if (trangThai === "chưa thanh toán") {
                                                                                return renderRateServiceButton(bookingRoomDetail, '#5d9fc5', 'thanh toán', handleOpenModal);
                                                                            } else if (trangThai === "chờ khách check in") {
                                                                                return renderRateServiceButton(bookingRoomDetail, '#FF0000', 'hủy phòng', handleCancelBookingRoom);
                                                                            } else {
                                                                                return <td className='center'></td>;
                                                                            }
                                                                        })()
                                                                    )}
                                                                </tr>
                                                            );
                                                        })}
                                                        <tr key={roomTypeIndex}>
                                                            <td colSpan={5} style={{ fontWeight: 'bold', }}>
                                                                {/* Tổng tiền của {roomType.key.name} */}
                                                            </td>
                                                            <td colSpan={2} style={{ fontWeight: 'bold', }}>
                                                                Tổng tiền của {roomType.key.name}:  {
                                                                    roomType.value?.reduce((total, currentRoom, index) => {
                                                                        const bookingRoom = currentRoom?.bookingRoom;
                                                                        const checkInDate = bookingRoom?.checkInDate;
                                                                        const checkOutDate = bookingRoom?.checkOutDate;
                                                                        const price = currentRoom?.room.roomType.price;

                                                                        if (checkInDate && checkOutDate && price) {
                                                                            const roomTotal = calculateDays(checkInDate, checkOutDate) * price;
                                                                            total += roomTotal;

                                                                            updateTongTien(bookingRoom.id, roomTotal)
                                                                        }
                                                                        return total;
                                                                    }, 0) + " VNĐ"
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={7} style={{ padding: "0px" }}>
                                                                <hr style={{ border: "1px solid #000", width: "100%" }} />
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </Table>

                                        {(() => {
                                            if (!subItem || !subItem.key) {
                                                console.error("subItem hoặc subItem.key là undefined");
                                                return null;
                                            }

                                            const status = subItem.key.status;

                                            return (
                                                <div key={subIndex}>
                                                    <Price>
                                                        <div>
                                                            <div>
                                                                {status === "chưa thanh toán" ? (
                                                                    <div style={{ color: 'red' }}>Vui lòng thanh toán để sử dụng phòng</div>
                                                                ) : (
                                                                    <div style={{ color: 'green' }}>Cảm ơn bạn đã thanh toán</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                            <div style={{ color: status === "Đã thanh toán" ? 'green' : 'red' }}>
                                                                <TotalText>
                                                                    Tổng tiền: {
                                                                        TongTien.find(item => item.id === subItem.key.id)
                                                                            ? TongTien.find(item => item.id === subItem.key.id).tongtien.toLocaleString() + " VNĐ"
                                                                            : "0 VNĐ"
                                                                    }
                                                                </TotalText>
                                                            </div>
                                                            {status === "chưa thanh toán" && (
                                                                <ButtonCPN text="Đặt phòng" onClick={() => handleOpenModal(item)} />
                                                            )}
                                                        </div>
                                                    </Price>
                                                    <hr />
                                                </div>
                                            );
                                        })()}

                                        <hr />
                                    </div>
                                ))}
                            </Container1>
                        </HistoryBillContainer>
                    </HistoryBill>
                ))}
            </InfiniteScroll>


            <ModalWrapper show={showModal} onHide={handleCloseModal} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Đánh giá dịch vụ</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {selectedBookingRoomDetails && (
                        <>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
                                <img src={"/img/hotels/room_type/" + selectedBookingRoomDetails.room.roomType.image} alt={selectedBookingRoomDetails.room.roomTypeName} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                                <div>
                                    {selectedBookingRoomDetails.room.roomTypeName}
                                    <div style={{ fontSize: '23px', color: '#7e8d9f' }}>số phòng:{selectedBookingRoomDetails.room.roomNumber}</div>
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
                                    {RateRoom.find(item => item.bookingRoomDetails.id === selectedBookingRoomDetails.id) ? (
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
                        style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f5f5f', color: 'white' }}
                        disabled={!selectedBookingRoomDetails || bookingRoomRatings[selectedBookingRoomDetails?.id]}
                    />
                    <ButtonCPN
                        text={RateRoom.find(item => item.bookingRoomDetails.id === selectedBookingRoomDetails?.id) ? "Cập nhật" : "Gửi"}
                        onClick={handleSubmitRating}
                        style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={
                            !selectedBookingRoomDetails ||
                            tempRating === 0 ||
                            (tempRating === initialRating && tempReview === initialReview) // Disable if no changes are detected
                        }
                    />
                </ModalFooter>
            </ModalWrapper>

            <ModalWrapper show={showModalUpdate} onHide={handleCloseModal} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Gia hạng phòng</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {selectedBookingRoomDetails && (
                        <>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
                                <img src={"/img/hotels/room_type/" + selectedBookingRoomDetails.room.roomType.image} alt={selectedBookingRoomDetails.room.roomTypeName} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                                <div>
                                    {selectedBookingRoomDetails.room.roomTypeName}
                                    <div style={{ fontSize: '16px', color: '#7e8d9f' }}>số phòng: {selectedBookingRoomDetails.room.roomNumber}</div>
                                    <div style={{ fontSize: '16px', color: '#7e8d9f' }}>Loại phòng: {selectedBookingRoomDetails.room.roomType.name}</div>
                                </div>
                            </div>
                            <Row style={{margin:'20px 0'}}>
                                <DatePickerContainer>
                                    <StyledDatePicker
                                        selected={new Date(selectedBookingRoomDetails.bookingRoom.checkOutDate)}
                                        dateFormat="dd 'Tháng' M yyyy"
                                        startDate={new Date(selectedBookingRoomDetails.bookingRoom.checkInDate)}
                                        placeholderText="Chọn ngày bắt đầu"
                                        disabled={true}
                                    />
                                    <StyledDatePicker
                                        selected={endDate}
                                        onChange={(date) => { setEndDate(date); setStartDate(selectedBookingRoomDetails.bookingRoom.checkOutDate) }}
                                        selectsEnd
                                        startDate={startDate}
                                        dateFormat="dd 'Tháng' M yyyy"
                                        endDate={endDate}
                                        minDate={getMinEndDate()}
                                        placeholderText="Chọn ngày rời đi"
                                    />
                                </DatePickerContainer>
                            </Row>
                            <TableExtend>
                                <thead>
                                    <tr>
                                        <th>Số ngày gia hạn</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{calculateDays(startDate, endDate)} ngày</td>
                                        <td style={{color:'#e65c5c'}}>{(selectedBookingRoomDetails.room.roomType.price * calculateDays(startDate, endDate)).toLocaleString()} VNĐ</td>
                                    </tr>
                                </tbody>
                            </TableExtend>

                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <ButtonCPN
                        text="Huỷ"
                        onClick={handleCancel}
                        style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f5f5f', color: 'white' }}
                        disabled={!selectedBookingRoomDetails || bookingRoomRatings[selectedBookingRoomDetails?.id]}
                    />
                    <ButtonCPN
                        text="Gia Hạng"
                        onClick={payment}
                        style={{ width: '110px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={
                            !selectedBookingRoomDetails ||
                            startDate === null ||
                            endDate === null
                        }
                    />
                </ModalFooter>
            </ModalWrapper>
        </>
    );
};

export default HistoryBookingRoom;
