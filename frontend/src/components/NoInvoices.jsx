import React from 'react';
import styled from 'styled-components';

const NoInvoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px; /* Adjust height as needed */
  background-color: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const Message = styled.h2`
  color: #555;
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubMessage = styled.p`
  color: #888;
  font-size: 16px;
`;

const NoInvoices = () => {
  return (
    <NoInvoicesContainer>
      <Message>Không có hóa đơn nào</Message>
      <SubMessage>Vui lòng kiểm tra lại sau hoặc tạo hóa đơn mới.</SubMessage>
    </NoInvoicesContainer>
  );
};

export default NoInvoices;
