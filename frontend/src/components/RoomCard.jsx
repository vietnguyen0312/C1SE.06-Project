import React, { forwardRef } from 'react';
import styled from 'styled-components';

const ChooseRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px; /* Thêm khoảng cách giữa các phòng */
`;

const PriceSquare = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8b600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 20px; /* Giảm khoảng cách giữa các ô giá để dễ nhìn hơn */
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s; /* Thêm hiệu ứng chuyển đổi cho transform */
  
  &:hover {
    background-color: #dd9c00;
    transform: scale(1.05); /* Hiệu ứng phóng to nhẹ khi hover */
  }
`;

const RoomCard = forwardRef(({ room, isSelected, onPriceClick, index }, ref) => {
  return (
    <ChooseRoom data-aos-delay={index * 100} ref={ref}>
      <PriceSquare
        selected={isSelected}
        onClick={() => onPriceClick(room)}
        style={{
          backgroundColor: isSelected ? '#90EE90' : '#f8b600',
        }}
      >

      </PriceSquare>
      <span>Phòng {room.roomNumber}</span>

    </ChooseRoom>
  );
});

// Thêm displayName cho component
RoomCard.displayName = 'RoomCard';

export default RoomCard;
