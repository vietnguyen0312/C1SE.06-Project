import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SliderCpn from '../components/Slider/SliderCpn';
import axios from "../Configuration/AxiosConfig";
import ButtonCpn from '../components/Button/Button';
import { RatingItem, RatingImage, RatingContent, StarRating, TotalRating, Bottom, RatingAuthor, RatingText, RatingContainer } from '../Service/ServiceList';
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

const ModalPrice = styled.p`
  color: #dd2727;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalRoomDetail = () => {
    return (
        <>
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
                    <LinkR to={`/booking?roomTypeId=${selectedRoom.id}`}> <ButtonCpn text="Đặt Phòng" /> </LinkR>
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
        </>
    )
}

export default ModalRoomDetail;