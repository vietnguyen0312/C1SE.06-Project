import React from "react";
import styled from "styled-components";
import ServiceOnManagerTab from "../../../components/ServiceOnManagerTab";

const ServiceContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const Service = () => {

  return (
    <>
      <ServiceContainer>
            <ServiceOnManagerTab />
      </ServiceContainer>
    </>
  );
};

export default Service;
