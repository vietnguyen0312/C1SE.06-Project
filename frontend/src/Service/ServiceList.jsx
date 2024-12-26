import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalf, faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from '../Configuration/AxiosConfig'
import { Pagination } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import '../Style/Service.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: ${props => props.isVisible ? fadeIn : fadeOut} 0.5s forwards;
`;

const ModalWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-out;
  transform: scale(${props => props.isVisible ? 1 : 0.9});
  opacity: ${props => props.isVisible ? 1 : 0};
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 4px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 15px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #dee2e6;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: black;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 15px;
`;

const ServiceTitle = styled.h3`
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  &:hover {
    color: orange;
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
  border-radius: 5px; /* Adjusted to make it slightly more square */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  object-fit: cover;
`;

const ServiceDescription = styled.p`
  margin-bottom: 0;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

export const RatingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  
`;

export const RatingImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RatingContent = styled.div`
  flex: 1;
`;

export const RatingText = styled.p`
  margin: 10px 0;
  font-size: 15px;
  color: #555;
`;

export const RatingAuthor = styled.h4`
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
`;

export const StarRating = styled.div`
  color: #ffc107;
`;

export const TotalRating = styled.div`
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap:5px;
`;

export const Bottom = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    color: #9a9a9a;
    font-size: 14px;

    div {
        cursor: pointer;

        &:hover {
            color: #ffc107;
        }
    }
`;

export class ServiceList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            loading: true,
            selectedService: null,
            isModalOpen: false,
            currentPage: 1,
            totalPages: 0,
            pageSize: 6,
            totalElements: 0,
            ratingsOfSelectedService: [],
            filterBySearch: props.search || null,
            filterByServiceTypeId: props.serviceTypeId || null,
            limit: props.limit || null,
            hasMoreRatings: true,
            ratingsPage: 2,
            totalRatings: 0
        }
        this.serviceListRef = React.createRef();
    }

    getServices = async () => {
        let response = await axios.get('/services', {
            params: {
                serviceTypeId: this.state.filterByServiceTypeId,
                page: this.state.currentPage,
                size: this.state.pageSize,
                search: this.state.filterBySearch
            }
        });

        if (this.state.limit) {
            response.result.data = response.result.data.slice(0, this.state.limit);
            this.setState({ services: response.result.data, loading: false });
            return;
        }

        this.setState({
            services: response.result.data,
            loading: false,
            totalPages: response.result.totalPages,
            totalElements: response.result.totalElements
        });
    }

    componentDidMount() {
        this.getServices();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.serviceTypeId !== this.props.serviceTypeId || prevProps.search !== this.props.search) {
            this.setState({
                filterByServiceTypeId: this.props.serviceTypeId,
                filterBySearch: this.props.search,
                currentPage: 1,
                loading: true
            }, this.getServices);
        }

        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({ loading: true }, this.getServices);
        }

    }

    disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    enableScroll() {
        document.body.style.overflow = 'unset';
    }

    setSelectedService = async (service) => {
        if (this.props.onServiceSelect) {
            this.props.onServiceSelect(service);
        } else {
            const AVG_RATING = await axios.get(`/rate-services/get-AVG-Score/${service.id}`);
            const RATINGS = await axios.get('/rate-services', {
                params: {
                    serviceId: service.id,
                    page: 1,
                    size: 5
                }
            });

            this.setState({
                selectedService: { service, averageRating: AVG_RATING.result },
                isModalOpen: true,
                totalRatings: RATINGS.result.totalElements
            });

            if (RATINGS.result.data && RATINGS.result.data.length > 0) {
                this.setState({
                    ratingsOfSelectedService: RATINGS.result.data
                });
            } else {
                this.setState({
                    hasMoreRatings: false
                });
            }
        }
        this.disableScroll();
    };

    loadMoreRatings = () => {
        setTimeout(async () => {
            const { selectedService, ratingsPage } = this.state;
            const RATINGS = await axios.get('/rate-services', {
                params: {
                    serviceId: selectedService.service.id,
                    page: ratingsPage,
                    size: 5
                }
            });

            if (RATINGS.result.data && RATINGS.result.data.length > 0) {
                this.setState(prevState => ({
                    ratingsOfSelectedService: [...prevState.ratingsOfSelectedService, ...RATINGS.result.data],
                    ratingsPage: prevState.ratingsPage + 1
                }));
            } else {
                this.setState({ hasMoreRatings: false });
            }
        }, 1000);
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, hasMoreRatings: true, ratingsOfSelectedService: [] });
        this.enableScroll();
    }

    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber, loading: true }, () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.getServices();
        });
    }

    toggleShowAll = () => {
        this.setState(prevState => ({ showAll: !prevState.showAll }));
    };

    render() {
        return (
            <div style={{ backgroundColor: '#f8f9fa' }}>
                <div className='row' ref={this.serviceListRef}>
                    {this.state.loading && (
                        <div className="loading-container">
                            <LoadingIcons.TailSpin stroke="#000" />
                        </div>
                    )}
                    {this.state.services.map(service => (
                        <div className="col-md-4 ftco-animate container" key={service.id}>
                            <div className="project-wrap">
                                <a className="img" target="_blank" rel="noopener noreferrer">
                                    <img src={service.image} alt={service.name} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                                </a>
                                <div className="text p-4">
                                    <h3>
                                        <button
                                            className="service-button"
                                            onClick={() => this.setSelectedService(service)}
                                        >
                                            {service.name}
                                        </button>
                                    </h3>
                                    <p className="location">
                                        <span className="fa fa-map-marker"></span>
                                        {service.description}
                                    </p>
                                    <ul>
                                        <li>
                                            <span className="flaticon-mountains"></span>
                                            <a>{service.serviceType.name}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                    {this.state.isModalOpen && this.state.selectedService && (
                        <ModalBackdrop isVisible={this.state.isModalOpen} onClick={this.closeModal}>
                            <ModalWrapper isVisible={this.state.isModalOpen} onClick={(e) => e.stopPropagation()}>
                                <ModalContent>
                                    <ModalHeader>
                                        <ModalTitle>{this.state.selectedService.service.serviceType.name}</ModalTitle>
                                        <CloseButton onClick={this.closeModal} aria-label="Close">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </CloseButton>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="mb-3">
                                            <ServiceTitle>{this.state.selectedService.service.name}</ServiceTitle>
                                        </div>
                                        <div className="mb-3 text-center">
                                            <ServiceImage
                                                src={`${this.state.selectedService.service.image}`}
                                                alt="Service Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div style={{ borderBottom: '2px solid #f8b600', paddingBottom: '15px' }}>
                                            <p><strong>Description:</strong></p>
                                            <ServiceDescription>{this.state.selectedService.service.description}</ServiceDescription>
                                        </div>
                                        <div>
                                            <RatingContainer>
                                                <h5>Đánh giá dịch vụ ({this.state.totalRatings})</h5>
                                                <TotalRating>
                                                    {this.state.selectedService.averageRating} <div style={{ color: '#787878' }}>/ 5</div>
                                                    <StarRating style={{ marginLeft: '5px' }}>
                                                        {[...Array(5)].map((_, i) => {
                                                            if (i < Math.floor(this.state.selectedService.averageRating)) {
                                                                return (
                                                                    <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                                                                );
                                                            } else if (i === Math.floor(this.state.selectedService.averageRating)) {
                                                                const decimalPart = this.state.selectedService.averageRating % 1;
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
                                                <div style={{ marginTop: '20px' }}>
                                                    <InfiniteScroll
                                                        key={this.state.selectedService.service.id}
                                                        dataLength={this.state.ratingsOfSelectedService.length}
                                                        next={this.loadMoreRatings}
                                                        hasMore={this.state.hasMoreRatings}
                                                        loader={<div className="loading-container">
                                                            <LoadingIcons.TailSpin stroke="#000" />
                                                        </div>}
                                                    >
                                                        {this.state.ratingsOfSelectedService.length > 0 ? (
                                                            this.state.ratingsOfSelectedService.map((rating, index) => (
                                                                <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                                                    <RatingItem>
                                                                        <div>
                                                                            <RatingImage src={`${rating.user.avatar}`} />
                                                                        </div>
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
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="no-ratings" style={{ textAlign: 'center', marginTop: '20px' }}>
                                                                Không có bình luận nào.
                                                            </div>
                                                        )}
                                                    </InfiniteScroll>
                                                </div>
                                            </RatingContainer>
                                        </div>
                                    </ModalBody>
                                </ModalContent>
                            </ModalWrapper>
                        </ModalBackdrop>
                    )}


                </div>

                {this.state.totalPages > 1 && (
                    <Pagination
                        count={this.state.totalPages}
                        page={this.state.currentPage}
                        onChange={(event, page) => this.paginate(page)}
                        variant="outlined"
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                            "& .MuiPaginationItem-root": {
                                color: 'black',
                                border: '1px solid #dee2e6',
                            },
                            "& .Mui-selected": {
                                backgroundColor: '#ffc107',
                                color: 'white',
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                color: 'black',
                            }
                        }}
                    />
                )}
            </div>
        )
    }
}

export default ServiceList
