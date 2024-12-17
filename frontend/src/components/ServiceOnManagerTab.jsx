import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcons from 'react-loading-icons';
import styled from "styled-components";
import { Modal } from 'antd';
import axios from '../Configuration/AxiosConfig'; 
import { useEffect, useState } from "react";
import React from 'react';

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

const ServiceOnManagerTab = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    const [serviceData, setServiceData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setTimeout(async () => {
            const response = await axios.get(`/services`, { params: { page: page, size: 15 } });
            setServiceData(prevData => [...prevData, ...response.result.data]);
            setHasMore(response.result.data.length > 0);
            setPage(page + 1);
        }, 400);
    };

    const fetchTicketByServiceId = async (serviceId) => {
        const response = await axios.get(`/tickets/getByIdService/${serviceId}`);
        console.log(response.result.value);
        return response.result.value;
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleServiceItemClick = async (item) => {
        const tickets = await fetchTicketByServiceId(item.id);
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
                        {Array.isArray(tickets) && tickets.map((ticket) => (
                            <React.Fragment key={ticket.ticketType.name}>
                                <div style={{ display: 'table-row' }}>
                                    <div style={{ display: 'table-cell', width: '50%', textAlign: 'right', padding: '8px', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}>
                                        Vé {ticket.ticketType.name}
                                    </div>
                                    <div style={{ display: 'table-cell', width: '50%', textAlign: 'left', padding: '8px' }}>
                                        {ticket.quantity}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        );
        setIsModalVisible(true);
    };

return (
    <>
        <InfiniteScroll
            dataLength={serviceData.length}
            next={() => fetchServices()}
            hasMore={hasMore}
            loader={<div className="loading-container">
                <LoadingIcons.TailSpin stroke="#000" />
            </div>}
        >
        <ServiceItemWrapper>
            {serviceData.map((service) => (
                <ServiceItem key={service.id} onClick={() => handleServiceItemClick(service)}>
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <ServiceImage src={service.image} alt={service.name} />
                    </div>
                    <ServiceName>{service.name}</ServiceName>
                    <Description>{service.description}</Description>
                    </ServiceItem>
                ))}
            </ServiceItemWrapper>
        </InfiniteScroll>
        
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
    </>
    )
}

export default ServiceOnManagerTab;

