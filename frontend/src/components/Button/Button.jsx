import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 25px;
  background-color: #f8b600; 
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width:275px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng */

  &:hover {
    background-color: black; /* Màu đậm hơn khi hover */
    transform: translateY(-2px); /* Hiệu ứng nổi khi hover */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15); /* Tăng độ đổ bóng khi hover */
  }

  &:active {
    transform: translateY(0); /* Không hiệu ứng khi click */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng bình thường */
  }
`;

const ButtonCPN = ({ text, onClick, type = "button" }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default ButtonCPN;
