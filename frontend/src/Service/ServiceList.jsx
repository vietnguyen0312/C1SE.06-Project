import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../Style/Service.css'
import '../Style/Loading.css'
import axios from '../Configuration/AxiosConfig'
import { Pagination } from '@mui/material';

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
        this.serviceListRef = React.createRef(); // Add this line
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
                filterBySearch: this.props.search
            }, this.getServices);
        }
        
        if (prevState.currentPage !== this.state.currentPage) {
            this.getServices();
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
            <>
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
                        <div className="modal-backdrop fade show" onClick={this.closeModal}>
                            <div
                                className={`modal custom-modal fade ${this.state.isModalOpen ? 'show' : ''}`}
                                onClick={e => e.stopPropagation()}
                                style={{ display: 'block' }}
                            >
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3>{this.state.selectedService.serviceType.name}</h3>
                                            <button
                                                type="button"
                                                className="close"
                                                onClick={this.closeModal}
                                                aria-label="Close"
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <h3
                                                    style={{ color: 'black', cursor: 'pointer' }}
                                                    onMouseOver={(e) => e.target.style.color = 'orange'}
                                                    onMouseOut={(e) => e.target.style.color = 'black'}
                                                >
                                                    {this.state.selectedService.name}
                                                </h3>
                                            </div>
                                            <div className="mb-3 text-center">
                                                <img
                                                    src={`/img/service/${this.state.selectedService.image}`}
                                                    alt="Service Image"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div>
                                                <p><strong>Description:</strong></p>
                                                <p>{this.state.selectedService.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </>
        )
    }
}

export default ServiceList