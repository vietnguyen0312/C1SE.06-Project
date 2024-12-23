import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Left = styled.div`
  width: 20%;
  height: 100vh;
`;

const Right = styled.div`
  width: 120%;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Left>
          <SideBar />
        </Left>
        <Right>
          <Outlet />
        </Right>
      </Container>
    </>
  );
};

export default MainLayout;
