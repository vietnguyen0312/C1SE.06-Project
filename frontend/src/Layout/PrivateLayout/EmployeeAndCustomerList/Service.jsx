import React from "react";
import styled from "styled-components";
import { Modal } from 'antd';
import axios from '../../../Configuration/AxiosConfig'; 
import { useEffect, useState } from "react";

const ServiceContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    cursor: pointer;
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
    height: 250px;
    width: 300px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #989595;
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

const Service = () => {
    const [serviceData, setServiceData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });

    const fetchData = async () => {
        const response = await axios.get('/services');
        setServiceData(response.result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const serviceTypes = Array.from(
        new Set(serviceData.map(item => item.serviceType.name))
    );

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleServiceItemClick = (item) => {
        setModalContent(
            <div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center",borderBottom: "1px solid #ddd",padding: "20px 0"}}>
                    <img src={item.image} alt={item.name} style={{ width: '500px', height: '300px', borderRadius: '10px',display: "flex", justifyContent: "center", alignItems: "center" }} />
                    <h2>{item.name}</h2>
                    <p style={{marginTop: "10px",color: "#989595"}}>{item.description}</p>
                </div>
                
                <div style={{marginTop: "20px", fontSize: "18px", fontWeight: "600", color: "#1b60d8"}}>Số lượng vé còn lại</div>
                <div style={{ display: 'table', width: '50%', borderCollapse: 'collapse' }}>
                    <div style={{ display: 'table-row', borderBottom: '1px solid #ddd' }}>
                        <div style={{ display: 'table-cell', width: '50%', textAlign: 'right', padding: '8px', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}>
                            Vé người lớn
                            </div>
                            <div style={{ display: 'table-cell', width: '50%', textAlign: 'left', padding: '8px' }}>
                                10
                            </div>
                        </div>
                </div>
            </div>

        );
        setIsModalVisible(true);
    };

    return (
        <ServiceContainer>
            {serviceTypes.map((type, index) => (
                <ServiceTypeContainer key={index}>
                    <ServiceTypeTitle>{type}</ServiceTypeTitle>
                    <ServiceItemWrapper>
                        {serviceData.filter(item => item.serviceType.name === type).map((item, index) => (
                            <ServiceItem key={index} onClick={() => handleServiceItemClick(item)}>
                                <div style={{display: "flex", justifyContent: "space-between",}}>
                                    <ServiceImage src={item.image} alt={item.name} />
                                </div>
                                <ServiceName>{item.name}</ServiceName>
                                <Description>{item.description}</Description>
                            </ServiceItem>
                        ))}
                    </ServiceItemWrapper>
                </ServiceTypeContainer>
            ))}
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                centered
                width={modalSize.width}
                style={{ top: 20, borderRadius: '10px', overflow: 'hidden' }}
            >
                {modalContent}
            </Modal>
        </ServiceContainer>
    );
};

export default Service;
