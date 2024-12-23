import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SliderCpn from '../components/Slider/SliderCpn';
import axios from "../Configuration/AxiosConfig";
import ButtonCpn from '../components/Button/Button';
import { RatingItem, RatingImage, RatingContent, StarRating, TotalRating, Bottom, RatingAuthor, RatingText, RatingContainer } from './ServiceList';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcons from 'react-loading-icons'
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import { ModalTitle, ModalWrapper, ModalHeader, ModalBody, ModalFooter, WriteRating, TableExtend } from '../Layout/PublicLayout/HistoryBill/style';
import ButtonCPN from '../components/Button/Button';
import ReactRating from 'react-rating';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;
const StarIcon = styled(FontAwesomeIcon)`
    font-size: 25px; 
`;
const TextAreaWrapper = styled.div`
    margin-top: 10px;
    position: relative;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  margin-top: 150px;
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
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  margin: 0 10px;
`;

const AboutInfoSection = styled.section`
  padding: 120px 0;
  background-color: #f5f5f5;
`;

const InfoContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoLeft = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const InfoImage = styled.img`
  width: 100%;
  height: auto;
`;

const InfoRight = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;
const InfoText = styled.p`
  color: #777;
  line-height: 1.8;
`;

const BannerSectionHotels = styled.section`
  background-image: url('https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643418/headerHotel_imr71k.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
  outline: none;
`;

const TypeRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  user-select: none;
  outline: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  p {
    width: 50%;
  }
  h1 {
    font-weight: bold;
    font-size: 63px;
    font-family: 'Arial', sans-serif;
  }
`;

const RoomCard = styled.div`
  width: 47vh;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  &:hover {
    box-shadow: 0 0 20px rgba(237, 184, 36, 0.2);
    transform: translateY(-10px) scale(1.05);
  }
`;

const RoomImage = styled.img`
  width: 45vh;
  height: 300px;
  object-fit: cover;
  border-radius: 7px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const RoomInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RoomName = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;
const RoomPrice = styled.p`
  font-size: 16px;
  color: #dd2727;
`;
const LinkR = styled(StyledLink)`
  text-decoration: none;
  color: inherit;
  margin-bottom: 10px;
  &:hover {
    color: #f8b600;
    transition: 0.3s ease;
  }
`;

const ContainerSlider = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  height: 100vh;
  padding: 0 15px;
  border:none;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  height: 100vh;
  overflow-y: auto;
`;
const WordCount = styled.div`
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    color: #999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px; // Increased padding
  border-radius: 10px;
  max-width: 600px; // Increased max-width
  width: 100%;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 48vh;
  border-radius: 7px;
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 0px;
  background: none;
  border: none;
  font-size: 25px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: #f8b600;
  border-radius: 0 0 0 10px;
  cursor: pointer;
`;

// const ModalTitle = styled.h2`
//   border-top: 1px solid #f8b600;
//   margin-top: 10px;
//   padding-top: 10px;
// `;

const ModalPrice = styled.p`
  color: #dd2727;
  font-size: 18px;
  margin-bottom: 20px;
`;

class RoomTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      selectedRoom: null,
      isModalOpen: false,
      RateByRoomType: {},
      ratingsOfSelectedService: [],
      hasMoreRatings: true,
      selectedService: {
        averageRating: 0,
        service: {
          id: null,
        },
      },
      page: {},
      totalElements: {},
      hasMore: {},
      user: [],
      selectedBookingRoomDetails: [],
      showModal: false,
      hoverRating: 0,
      tempRating: 0,
      tempReview: '',
      maxWords: 300,
      selectedRateRoom: [],
    };
  }

  getRatingsOfSelectedService = async (roomTypeId, page) => {


    const response = await axios.get(`/rate-room/by-room-type/${roomTypeId}?size=5&page=${page}`);


    this.setState((prevState) => {
      const currentRatings = prevState.RateByRoomType[roomTypeId] || [];

      // Assuming each rating has a unique 'ratingId'
      const updatedRatings = [...currentRatings, ...response.result.data];

      return {
        RateByRoomType: {
          ...prevState.RateByRoomType,
          [roomTypeId]: updatedRatings,
        },
        page: {
          ...prevState.page,
          [roomTypeId]: response.result.currentPage + 1,
        },
        totalElements: {
          ...prevState.totalElements,
          [roomTypeId]: response.result.totalElements,
        },
      };
    });
    if (response.result.currentPage === response.result.totalPages) {
      this.setState(prevState => ({
        hasMore: {
          ...prevState.hasMore,
          [roomTypeId]: false,
        },
      }));
    }
  };

  getInfor = async () => {
    const response = await axios.get('/users/myInfo');
    this.setState({ user: response.result });
  }

  componentDidMount() {
    AOS.init({ duration: 2000 });
    this.fetchRooms();
    this.getInfor();
  }

  fetchRooms = async () => {
    let response = await axios.get('/room_type');
    this.setState({ rooms: response.result });
    response.result.forEach((room) => {
      this.setState(prevState => ({
        page: {
          ...prevState.page,
          [room.id]: 1,
        },
        hasMore: {
          ...prevState.hasMore,
          [room.id]: true,
        },
        totalElements: {
          ...prevState.totalElements,
          [room.id]: 0,
        },
      }));
    });
  };

  handleModalOpen = (room) => {
    this.setState({
      selectedRoom: room,
      isModalOpen: true,
    });
    this.getRatingsOfSelectedService(room.id, this.state.page[room.id]);
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };


  handleDeleteRating = async (rating) => {

    // Assuming rating.id is the unique identifier for the rating
    const response = await axios.delete(`/rate-room/${rating.id}`);

    const roomTypeId = rating.bookingRoomDetails.room.roomType.id; // Adjust this path as necessary

    this.setState((prevState) => {
      const currentRatings = prevState.RateByRoomType[roomTypeId] || [];
      const updatedRatings = currentRatings.filter(item => item.id !== rating.id);

      return {
        RateByRoomType: {
          ...prevState.RateByRoomType,
          [roomTypeId]: updatedRatings,
        },
      };
    });

    toast.success('Đánh giá đã được xóa thành công');
  };

  handleOpenModal = (rate) => {
    // const existingRateRoom = this.state.RateByRoomType.bookingRoomDetails.find(item => item.bookingRoomDetails.id === bookingRoomDetail.id);
    // console.log(existingRateRoom);
    // if (existingRateRoom) {
    //   this.setState({ tempRating: existingRateRoom.score || 0 });
    //   this.setState({ tempReview: existingRateRoom.comment || '' });
    // } else {
    //   this.setState({ tempRating: 0 });
    //   this.setState({ tempReview: '' });
    // }

    // this.setState({ initialRating: existingRateRoom ? existingRateRoom.score : 0 });
    // this.setState({ initialReview: existingRateRoom ? existingRateRoom.comment : '' });

    // this.setState({ selectedBookingRoomDetails: bookingRoomDetail });
    // this.setState({ hoverRating: 0 });

    if (rate && rate.bookingRoomDetails) {
      this.setState({
        showModal: true,
        selectedBookingRoomDetails: rate.bookingRoomDetails, // Ensure this matches the structure of your data
        tempRating: rate.score,
        tempReview: rate.comment,
        selectedRateRoom: rate,
      });
    }
  };

  updateRateRoom = async () => {
    const rate = this.state.selectedRateRoom;
    const response = await axios.put(`/rate-room/${rate.id}`, {
      score: this.state.tempRating,
      comment: this.state.tempReview,
      dateUpdate: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z'
    });

    const roomTypeId = this.state.selectedBookingRoomDetails.room.roomType.id; // Ensure this is the correct path


    this.setState((prevState) => {
      // Ensure RateByRoomType is an object
      const currentRatings = prevState.RateByRoomType[roomTypeId] || [];

      // Assuming response.data contains the updated rating
      const updatedRatings = currentRatings.map(item => {
        // Use the correct identifier to match the item
        if (item.bookingRoomDetails.id === this.state.selectedBookingRoomDetails.id) {
          return { ...item, ...response.result };
        }
        return item;
      });


      return {
        RateByRoomType: {
          ...prevState.RateByRoomType,
          [roomTypeId]: updatedRatings,
        },
      };
    });

    toast.success('Cập nhật đánh giá phòng thành công');
    this.setState({ showModal: false });
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  handleEditReview = (review) => {
    this.setState({
      editingReview: review,
      editModalOpen: true,
      editRating: review.score,
      editComment: review.comment,
    });
  };

  handleUpdateReview = async () => {
    const { editingReview, editRating, editComment } = this.state;

    const response = await axios.put(`/rate-room/${editingReview.id}`, {
      score: editRating,
      comment: editComment,
      dateUpdate: moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm:ss') + 'Z',
    });
    this.setState((prevState) => ({
      RateByRoomType: prevState.RateByRoomType.map((item) =>
        item.id === editingReview.id ? { ...item, ...response.data } : item
      ),
      editModalOpen: false,
    }));
    toast.success('Cập nhật đánh giá thành công');

  };

  render() {
    const { rooms, selectedRoom, isModalOpen, RateByRoomType, totalElements, page, hasMore, selectedBookingRoomDetails, showModal, hoverRating, tempRating, tempReview } = this.state;

    const ratingsOfSelectedService = RateByRoomType[selectedRoom?.id] || [];
    const totalRatings = ratingsOfSelectedService.length;
    const averageRating = totalRatings > 0
      ? (ratingsOfSelectedService.reduce((sum, rating) => sum + rating.score, 0) / totalRatings).toFixed(1)
      : 0;


    return (
      <>
        <BannerSectionHotels>
          <Overlay />
          <Container>
            <Row>
              <AboutContent>
                <Title data-aos="zoom-in" data-aos-delay="100">Hotels</Title>
                <LinkNav>
                  <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                  <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                  <StyledLink to="/hotels" data-aos="fade-left" data-aos-delay="0">Hotels</StyledLink>
                </LinkNav>
              </AboutContent>
            </Row>
          </Container>
        </BannerSectionHotels>

        <AboutInfoSection data-aos="fade-up" data-aos-delay="100">
          <InfoContainer>
            <InfoRow>
              <InfoLeft>
                <InfoImage src="https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643419/h2_kair7g.jpg" alt="About Us" />
              </InfoLeft>
              <InfoRight>
                <h1>Chào mừng đến với <br />Healing Ecotourism</h1>
                <InfoText>
                  Healing Hotel, bao quanh bởi cảnh sắc thiên nhiên hoang sơ và không gian yên tĩnh đến lạ thường, mang ến cho du khách sự thư thái tuyệt đối.
                </InfoText>
              </InfoRight>
            </InfoRow>
          </InfoContainer>
        </AboutInfoSection>

        <TypeRoom>
          <Container>
            <Row>
              <Content>
                <h1>Phòng</h1>
                <InfoText>Healing Hotel là nơi kết nối giữa vẻ đẹp thiên nhiên và sự sang trọng hiện đại.</InfoText>
              </Content>
            </Row>
            <Row style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <RoomCard key={index} data-aos="fade-up">
                    <RoomImage src={room.image} alt={room.name} />
                    <RoomInfo>
                      <RoomName>{room.name}</RoomName>
                      <RoomPrice>{room.price.toLocaleString('vi-VN')} VNĐ / DAY</RoomPrice>
                      <LinkR to={`/booking?roomTypeId=${room.id}`} onClick={() => this.handleModalOpen(room)}>Đặt Phòng</LinkR>
                      <LinkR to="#" onClick={() => this.handleModalOpen(room)}>Xem Chi Tiết</LinkR>
                    </RoomInfo>
                  </RoomCard>
                ))
              ) : (
                <p>Không có phòng nào để hiển thị.</p>
              )}
            </Row>
          </Container>
        </TypeRoom>

        {/* Modal hiển thị chi tiết phòng */}
        {/* {isModalOpen && selectedRoom && (
          <ModalOverlay onClick={this.handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={this.handleModalClose}>×</CloseButton>
              <ModalImage src={`/img/hotels/room_type/${selectedRoom.image}`} alt={selectedRoom.name} />
              <ModalTitle>{selectedRoom.name}</ModalTitle>
              <ModalPrice>Giá: {selectedRoom.price.toLocaleString('vi-VN')} VNĐ</ModalPrice>
              <p>Mô Tả: {selectedRoom.detail}</p>
              <ButtonCpn text="Đặt Phòng" />
            </ModalContent>
          </ModalOverlay>
        )} */}
        {isModalOpen && selectedRoom && (
          <ModalOverlay onClick={this.handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
              <CloseButton onClick={this.handleModalClose}>×</CloseButton>
              <div style={{ overflowY: 'auto' }}>
                <div style={{ width: '100%', maxHeight: '50vh', overflow: 'hidden' }}>
                  <ModalImage src={selectedRoom.image} alt={selectedRoom.name} />
                </div>
                <ModalTitle>{selectedRoom.name}</ModalTitle>
                <ModalPrice>Giá: {selectedRoom.price.toLocaleString('vi-VN')} VNĐ</ModalPrice>
                <p>Mô Tả: {selectedRoom.detail}</p>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #f8b600' }}>
                  <ButtonCpn text="Đặt Phòng" />
                </div>
                <div>
                  <RatingContainer>
                    <h5>
                      Đánh giá dịch vụ (
                      {this.state.totalElements[selectedRoom.id]}
                      )
                    </h5>
                    <TotalRating>
                      {averageRating}<div style={{ color: '#787878' }}>/ 5</div>
                      <StarRating style={{ marginLeft: '5px' }}>
                        {[...Array(5)].map((_, i) => {
                          if (i < Math.floor(averageRating)) {
                            return (
                              <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                            );
                          } else if (i === Math.floor(averageRating)) {
                            const decimalPart = averageRating % 1;
                            if (decimalPart <= 0.2) {
                              return (
                                <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                              );
                            } else if (decimalPart >= 0.3 && decimalPart < 0.8) {
                              return (
                                <FontAwesomeIcon key={i} icon={faStarHalf} color="#ffc107" />
                              );
                            } else {
                              return (
                                <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                              );
                            }
                          } else {
                            return (
                              <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                            );
                          }
                        })}
                      </StarRating>
                    </TotalRating>
                    <div style={{ marginTop: '20px' }}>
                      <InfiniteScroll
                        key={selectedRoom.id}
                        dataLength={ratingsOfSelectedService.length}
                        next={() => this.getRatingsOfSelectedService(selectedRoom.id, page[selectedRoom.id])}
                        hasMore={hasMore[selectedRoom.id]}
                      // loader={<div className="loading-container">
                      //   <LoadingIcons.TailSpin stroke="#000" />
                      // </div>}
                      >
                        {ratingsOfSelectedService.length > 0 ? (
                          ratingsOfSelectedService.map((rating, index) => (
                            <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                              <RatingItem>
                                <div>
                                  <RatingImage src={rating.user.avatar} />
                                </div>
                                <RatingContent>
                                  <RatingAuthor>{rating.user.username}</RatingAuthor>
                                  <StarRating>
                                    {[...Array(5)].map((_, i) => (
                                      <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        color={i < rating.score ? "#ffc107" : "#e4e5e9"}
                                      />
                                    ))}
                                  </StarRating>
                                  <RatingText>Phòng: {rating.bookingRoomDetails.room.roomNumber}</RatingText>
                                  <RatingText>{rating.comment}</RatingText>
                                  <RatingText style={{ fontSize: '12px' }}>{rating.createdDate} trước</RatingText>
                                </RatingContent>
                              </RatingItem>
                              <Bottom>
                                <div>{this.formatDate(rating.dateUpdate)}</div>
                                {this.state.user.id === rating.user.id && (
                                  <>
                                    <div onClick={() => this.handleOpenModal(rating)}>Sửa</div>
                                    <div onClick={() => this.handleDeleteRating(rating)}>Xóa</div>
                                  </>
                                )}
                              </Bottom>
                            </div>
                          ))
                        ) : (
                          <div className="no-ratings" style={{ textAlign: 'center', marginTop: '20px' }}>
                            Không có bình luận nào.
                          </div>
                        )}
                      </InfiniteScroll>
                      {totalRatings < (totalElements[selectedRoom.id] || 0) && (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                          <button onClick={() => this.getRatingsOfSelectedService(selectedRoom.id, page[selectedRoom.id])}>Xem thêm</button>
                        </div>
                      )}
                    </div>
                  </RatingContainer>
                </div>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
        <TypeRoom>
          <Container>
            <Row>
              <Content>
                <h1>Ảnh</h1>
                <InfoText>Healing Ecotourism là nơi kết nối hoàn hảo giữa thiên nhiên hoang sơ và sự sang trọng tinh tế.</InfoText>
              </Content>
            </Row>
          </Container>
        </TypeRoom>
        <ContainerSlider>
          <SliderCpn arrImages={['https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643418/slider-1_zhvvqa.jpg', 'https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643419/slider-2_ktolzm.jpg', 'https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643419/slider-3_iu7asr.jpg', 'https://res.cloudinary.com/dgff7kkuu/image/upload/v1733643419/slider-4_u3cqsy.jpg']} />
        </ContainerSlider>

        <ModalWrapper show={showModal} onHide={this.handleCloseModal} centered>
          <ModalHeader closeButton>
            <ModalTitle>Đánh giá dịch vụ</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.selectedBookingRoomDetails && (
              <>

                {selectedBookingRoomDetails.room && selectedBookingRoomDetails.room.roomType && (
                  <div style={{ display: 'flex', gap: '20px', fontSize: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
                    <img src={selectedBookingRoomDetails.room.roomType.image} alt={selectedBookingRoomDetails.room.roomTypeName} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} />
                    <div>
                      {selectedBookingRoomDetails.room.roomTypeName}
                      <div style={{ fontSize: '23px', color: '#7e8d9f' }}>số phòng:{selectedBookingRoomDetails.room.roomNumber}</div>
                    </div>
                  </div>
                )}
                <WriteRating>
                  <ReactRating
                    fractions={2}
                    initialRating={this.state.tempRating}
                    onChange={(rate) => {
                      if (this.state.tempRating !== rate) {
                        this.setState({ tempRating: rate });
                      }
                    }}
                    onHover={(rate) => {
                      if (this.state.hoverRating !== rate) {
                        this.setState({ hoverRating: rate });
                      }
                    }}
                    onMouseLeave={() => {
                      if (this.state.hoverRating !== 0) {
                        this.setState({ hoverRating: 0 });
                      }
                    }}
                    emptySymbol={<StarIcon icon={faStar} color="#e4e5e9" />}
                    fullSymbol={<StarIcon icon={faStar} color="#ffc107" />}
                    placeholderSymbol={<StarIcon icon={faStarHalfAlt} color="#ffc107" />}
                  />
                  <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                    {this.state.hoverRating > 0 ? `Rating: ${this.state.hoverRating}` : 'Hover over the stars to rate'}
                  </div>
                </WriteRating>
                <div>Viết đánh giá</div>
                <TextAreaWrapper>
                  <textarea
                    placeholder="Hãy chia sẻ cảm nhận của bạn về phòng này với chúng tôi."
                    style={{ width: '100%', height: '100px', border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px', marginTop: '10px' }}
                    value={tempReview}
                    onChange={(e) => this.setState({ tempReview: e.target.value })}
                  ></textarea>
                  <WordCount>{tempReview.length}/{this.state.maxWords}</WordCount>
                </TextAreaWrapper>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonCPN
              text="Huỷ"
              onClick={() => this.setState({ showModal: false })}
              style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f5f5f', color: 'white' }}

            />
            <ButtonCPN
              text="Lưu"
              onClick={() => this.updateRateRoom()}
              style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}

            />
          </ModalFooter>
        </ModalWrapper>

        <ModalWrapper show={this.state.editModalOpen} onHide={() => this.setState({ editModalOpen: false })} centered>
          <ModalHeader closeButton>
            <ModalTitle>Chỉnh sửa đánh giá</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <ReactRating
              fractions={2}
              initialRating={this.state.editRating}
              onChange={(rate) => this.setState({ editRating: rate })}
              emptySymbol={<StarIcon icon={faStar} color="#e4e5e9" />}
              fullSymbol={<StarIcon icon={faStar} color="#ffc107" />}
              placeholderSymbol={<StarIcon icon={faStarHalfAlt} color="#ffc107" />}
            />
            <textarea
              placeholder="Chỉnh sửa bình luận của bạn"
              style={{ width: '100%', height: '100px', border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px', marginTop: '10px' }}
              value={this.state.editComment}
              onChange={(e) => this.setState({ editComment: e.target.value })}
            ></textarea>
          </ModalBody>
          <ModalFooter>
            <ButtonCPN
              text="Huỷ"
              onClick={() => this.setState({ editModalOpen: false })}
              style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f5f5f', color: 'white' }}
            />
            <ButtonCPN
              text="Lưu"
              onClick={this.handleUpdateReview}
              style={{ width: '105px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </ModalFooter>
        </ModalWrapper>

      </>
    );
  }
}

export default RoomTypeList;