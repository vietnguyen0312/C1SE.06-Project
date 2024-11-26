import React from "react";
import styled from "styled-components";

const ServiceContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

const ServiceTypeContainer = styled.div`
    margin-bottom: 40px;
`;

const ServiceTypeTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 2px solid #f8b600;
`;

const ServiceItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
`;

const ServiceItem = styled.div`
    background-color: #fff;
    height: 200px;
    width: 270px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    flex-direction: column;
    display: flex;
`;

const ServiceImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const ServiceName = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-top: 5px;
`;

const Status = styled.div`
    font-size: 14px;
    background-color: #ffcccc;
    padding: 10px;
    border-radius: 10px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ServiceData = [
    ...Array(5)
        .fill()
        .map((_, typeIndex) =>
            Array(10)
                .fill()
                .map((_, serviceIndex) => ({
                    name: `Service Name ${typeIndex + 1}-${serviceIndex + 1}`,
                    type: `Service Type ${typeIndex + 1}`,
                    image: "https://via.placeholder.com/150",
                    description: `Description for Service ${typeIndex + 1}-${serviceIndex + 1}`,
                    status: serviceIndex % 2 === 0 ? "Còn vé" : "Hết vé",
                }))
        )
        .flat(),
];

const Service = () => {

    const groupedData = ServiceData.reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc;
    }, {});

    return (
        <ServiceContainer>
            {Object.entries(groupedData).map(([type, services]) => (
                <ServiceTypeContainer key={type}>
                    <ServiceTypeTitle>{type}</ServiceTypeTitle>
                    <ServiceItemWrapper>
                        {services.map((item, index) => (
                            <ServiceItem key={index}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <ServiceImage
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <Status style={{backgroundColor: item.status === "Còn vé" ? "#ccffcc" : "#ffcccc"}}>
                                        {item.status}
                                    </Status>
                                </div>
                                <ServiceName>{item.name}</ServiceName>
                                <Description>{item.description}</Description>
                            </ServiceItem>
                        ))}
                    </ServiceItemWrapper>
                </ServiceTypeContainer>
            ))}
        </ServiceContainer>
    );
};

export default Service;
