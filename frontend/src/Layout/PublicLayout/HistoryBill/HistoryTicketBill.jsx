import React from "react";
import styled from "styled-components";
import HistoryTicket from "../../../Service/HistoryTicketBill";

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
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

export const BannerSectionTicket = styled.section`
  background-image: url("/img/header/h3.jpg");
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

const HistoryTicketBill = () => {

  return (
    <>
      <BannerSectionTicket>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title>Lịch sử đặt vé</Title>
            </AboutContent>
          </Row>
        </Container>
      </BannerSectionTicket>
      <HistoryTicket />
    </>
  );
};

export default HistoryTicketBill;
