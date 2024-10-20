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
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black; 
    transform: translateY(-2px); 
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15); 
  }

  &:active {
    transform: translateY(0); 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
  }
    
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonCPN = ({ text, onClick, type = "button", disabled = false,style }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} style={style} >
      {text}

    </StyledButton>
  );
};


export default ButtonCPN;
