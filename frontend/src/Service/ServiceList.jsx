import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from '../Configuration/AxiosConfig'
import { Pagination } from '@mui/material';
import styled from 'styled-components';
import '../Style/Service.css';

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
            limit: props.limit || null
        }
        this.serviceListRef = React.createRef(); 
    }

    getServices = async () => {
        let response;
        if (this.state.filterByServiceTypeId === null) {
            response = await axios.get('/services', {
                params: {
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
        } else {
            response = await axios.get('/services/findByServiceType',
                {
                    params: {
                        page: this.state.currentPage,
                        size: this.state.pageSize,
                        serviceTypeId: this.state.filterByServiceTypeId,
                        search: this.state.filterBySearch
                    }
                });
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

    render() {
        return (
            <div style={{backgroundColor: '#f8f9fa'}}>
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
                                        <div>
                                            <p><strong>Description:</strong></p>
                                            <ServiceDescription>{this.state.selectedService.description}</ServiceDescription>
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
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                    />
                )}
            </div>
        )
    }
}

export default ServiceList