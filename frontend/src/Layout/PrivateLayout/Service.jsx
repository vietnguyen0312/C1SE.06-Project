import React from "react";
import styled from "styled-components";
import { Modal } from 'antd';
import axios from '../../Configuration/AxiosConfig'; 
import { useEffect, useState } from "react";
import { RatingContainer, RatingItem, RatingImage, RatingContent, RatingAuthor, StarRating, RatingText, TotalRating } from "../../Service/ServiceList";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcons from "react-loading-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

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

const dataRating = [
    {
        user: { avatar: "avatar1.jpg", username: "Nguyễn Văn A" },
        rating: 5,
        comment: "Dịch vụ rất tốt, nhân viên nhiệt tình.",
    },
    {
        user: { avatar: "avatar2.jpg", username: "Trần Thị B" },
        rating: 4,
        comment: "Hài lòng với chất lượng dịch vụ, giá cả hợp lý.",
    },
    {
        user: { avatar: "avatar3.jpg", username: "Lê Văn C" },
        rating: 3,
        comment: "Dịch vụ ổn nhưng có thể cải thiện thêm.",
    },
];

const qualityTicket = [
    {
        name: "Vé người lớn",
        quantity: 5,
    }
]

const Service = () => {
    const [serviceData, setServiceData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 900, height: 500 });
    const [selectedService, setSelectedService] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [hasMoreRatings, setHasMoreRatings] = useState(true);
    const [ratingsPage, setRatingsPage] = useState(2);

    const fetchData = async () => {
        const response = await axios.get('/services');
        setServiceData(response.result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchRatings = async (serviceId) => {
        const AVG_RATING = await axios.get(`/rate-services/get-AVG-Score/${serviceId}`);
        const RATINGS = await axios.get('/rate-services', {
            params: {
                serviceId: serviceId,
                page: 1,
                size: 5
            }
        });

        setAverageRating(AVG_RATING.result);
        setTotalRatings(RATINGS.result.totalElements);
        setRatings(RATINGS.result.data);
        setHasMoreRatings(RATINGS.result.data.length > 0);
    };

    const handleServiceItemClick = async (item) => {
        setSelectedService(item);
        await fetchRatings(item.id);
        setModalContent(
            <div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center",borderBottom: "1px solid #ddd",padding: "20px 0"}}>
                    <img src={item.image} alt={item.name} style={{ width: '500px', height: '300px', borderRadius: '10px',display: "flex", justifyContent: "center", alignItems: "center" }} />
                    <h2>{item.name}</h2>
                    <p style={{marginTop: "10px",color: "#989595"}}>{item.description}</p>
                </div>
                <RatingContainer>
                    <h5>Đánh giá dịch vụ ({totalRatings})</h5>
                    <TotalRating>
                        {averageRating} <div style={{ color: '#787878' }}>/ 5</div>
                        <StarRating style={{ marginLeft: '5px' }}>
                            {[...Array(5)].map((_, i) => {
                                if (i < Math.floor(averageRating)) {
                                    return (
                                        <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                                    );
                                } else if (i === Math.floor(averageRating)) {
                                    const decimalPart = averageRating % 1;
                                    if (decimalPart <= 0.2) {
                                        return (
                                            <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                                        );
                                    } else if (decimalPart >= 0.3 && decimalPart < 0.8) {
                                        return (
                                            <FontAwesomeIcon key={i} icon={faStarHalf} color="#ffc107" />
                                        );
                                    } else {
                                        return (
                                            <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                                        );
                                    }
                                } else {
                                    return (
                                        <FontAwesomeIcon key={i} icon={faStar} color="#e4e5e9" />
                                    );
                                }
                            })}
                        </StarRating>
                    </TotalRating>
                    <InfiniteScroll
                        dataLength={ratings.length}
                        next={loadMoreRatings}
                        hasMore={hasMoreRatings}
                        loader={<div className="loading-container">
                            <LoadingIcons.TailSpin stroke="#000" />
                        </div>}
                    >
                        {ratings.length > 0 ? (
                            ratings.map((rating, index) => (
                                <RatingItem key={index}>
                                    <RatingImage src={`/img/user/${rating.user.avatar}`} />
                                    <RatingContent>
                                        <RatingAuthor>{rating.user.username}</RatingAuthor>
                                        <StarRating>
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                    color={i < rating.score ? "#ffc107" : "#e4e5e9"}
                                                />
                                            ))}
                                        </StarRating>
                                        <RatingText>{rating.comment}</RatingText>
                                    </RatingContent>
                                </RatingItem>
                            ))
                        ) : (
                            <div className="no-ratings" style={{ textAlign: 'center', marginTop: '20px' }}>
                                Không có bình luận nào.
                            </div>
                        )}
                    </InfiniteScroll>
                </RatingContainer>
            </div>
        );
        setIsModalVisible(true);
    };

    const loadMoreRatings = async () => {
        const RATINGS = await axios.get('/rate-services', {
            params: {
                serviceId: selectedService.id,
                page: ratingsPage,
                size: 5
            }
        });

        if (RATINGS.result.data && RATINGS.result.data.length > 0) {
            setRatings(prevRatings => [...prevRatings, ...RATINGS.result.data]);
            setRatingsPage(prevPage => prevPage + 1);
        } else {
            setHasMoreRatings(false);
        }
    };

    const serviceTypes = Array.from(
        new Set(serviceData.map(item => item.serviceType.name))
    );

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
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
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
