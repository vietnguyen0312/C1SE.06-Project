import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalf, faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from '../Configuration/AxiosConfig'
import { Pagination } from '@mui/material';
import styled from 'styled-components';
import '../Style/Service.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonCPN from '../components/Button/Button';
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
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ServiceDescription = styled.p`
  margin-bottom: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

const RatingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  
`;

const RatingImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingContent = styled.div`
  flex: 1;
`;

const RatingText = styled.p`
  margin: 10px 0;
  font-size: 15px;
  color: #555;
`;

const RatingAuthor = styled.h4`
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
`;

const StarRating = styled.div`
  color: #ffc107;
`;

const TotalRating = styled.div`
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap:5px;
`;

const Bottom = styled.div`
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

const ratings = [
    {
        image: "img/user.png",
        text: "Do you want to be even more successful? Learn to love learning and growth.",
        author: "Harriet Maxwell",
        rating: 3
    },
    {
        image: "img/user.png",
        text: "A purpose is the eternal condition for success. Every former smoker can tell you how hard it is.",
        author: "Carolyn Craig",
        rating: 2
    },
    {
        image: "img/user.png",
        text: "The more effort you put into improving your skills, the bigger the payoff.",
        author: "Dennis Williams",
        rating: 5
    },
    {
        image: "img/user.png",
        text: "The more effort you put into improving your skills, the bigger the payoff.",
        author: "Dennis Williams",
        rating: 5
    },
    {
        image: "img/user.png",
        text: "A purpose is the eternal condition for success. Every former smoker can tell you how hard it is.",
        author: "Carolyn Craig",
        rating: 2
    },
    {
        image: "img/user.png",
        text: "The more effort you put into improving your skills, the bigger the payoff.",
        author: "Dennis Williams",
        rating: 5
    },
    {
        image: "img/user.png",
        text: "The more effort you put into improving your skills, the bigger the payoff.",
        author: "Dennis Williams",
        rating: 5
    },
]

const totalStar = ratings.reduce((total, rating) => total + rating.rating, 0);
const averageRating = ratings.length > 0 ? (totalStar / ratings.length).toFixed(1) : 0;


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
            filterBySearch: props.search || null,
            filterByServiceTypeId: props.serviceTypeId || null,
            limit: props.limit || null,
            showAll: false
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

    componentDidMount = () => {
        this.getServices()
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

    setSelectedService = (service) => {
        this.setState({ selectedService: service, isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
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
        const { showAll } = this.state;
        const ratingToShow = showAll ? ratings : ratings.slice(0, 3);
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
                                <a className="img" style={{ backgroundImage: `url(/img/service/${service.image})` }}></a>
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
                        <ModalBackdrop onClick={this.closeModal}>
                            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                                <ModalContent>
                                    <ModalHeader>
                                        <ModalTitle>{this.state.selectedService.serviceType.name}</ModalTitle>
                                        <CloseButton onClick={this.closeModal} aria-label="Close">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </CloseButton>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="mb-3">
                                            <ServiceTitle>{this.state.selectedService.name}</ServiceTitle>
                                        </div>
                                        <div className="mb-3 text-center">
                                            <ServiceImage
                                                src={`/img/service/${this.state.selectedService.image}`}
                                                alt="Service Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div style={{ borderBottom: '2px solid #f8b600', paddingBottom: '15px' }}>
                                            <p><strong>Description:</strong></p>
                                            <ServiceDescription>{this.state.selectedService.description}</ServiceDescription>
                                        </div>
                                        <div>
                                            <RatingContainer>
                                                <h5>Đánh giá dịch vụ ({ratings.length})</h5>
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
                                                <div style={{ marginTop: '20px' }}>
                                                    {ratingToShow.map((rating, index) => (
                                                        <div key={index} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                                            <RatingItem>
                                                                <div>
                                                                    <RatingImage src={rating.image} alt={rating.author} />
                                                                </div>
                                                                <RatingContent>
                                                                    <RatingAuthor>{rating.author}</RatingAuthor>
                                                                    <StarRating>
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <FontAwesomeIcon
                                                                                key={i}
                                                                                icon={faStar}
                                                                                color={i < rating.rating ? "#ffc107" : "#e4e5e9"}
                                                                            />
                                                                        ))}
                                                                    </StarRating>
                                                                    <RatingText>{rating.text}</RatingText>

                                                                </RatingContent>
                                                            </RatingItem>
                                                            <Bottom >
                                                                <div>?? Time</div>
                                                                <div>Sửa</div>
                                                                <div>Xóa</div>
                                                            </Bottom>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                                    {ratings.length > 3 && (
                                                        <ButtonCPN
                                                            onClick={this.toggleShowAll}
                                                            style={{ height: '40px', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                                                            text={this.state.showAll ? 'Thu gọn' : 'Xem thêm'}
                                                        />
                                                    )}
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