import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../Style/Service.css'
import '../Style/Loading.css'
import axios from '../Configuration/AxiosConfig'
import Pagination from '../components/Pagination'

export class ServiceList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            loading: true,
            currentPage: 1,
            servicesPerPage: 6,
            selectedService: null,
            isModalOpen: false,
            filterByServiceTypeId: props.serviceTypeId || null,
            limit: props.limit || null
        }
    }

    getServices = async () => {
        let response;
        if (this.state.filterByServiceTypeId === null) {
            response = await axios.get('/services');
            if (this.state.limit) {
                response.result = response.result.slice(0, this.state.limit);
            }
        } else {
            response = await axios.get(`/services/findByServiceType/${this.state.filterByServiceTypeId}`);
        }
        this.setState({ services: response.result, loading: false });
    }

    componentDidMount = () => {
        this.getServices()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.serviceTypeId !== this.props.serviceTypeId) {
            this.setState({ filterByServiceTypeId: this.props.serviceTypeId }, this.getServices);
        }
    }

    setSelectedService = (service) => {
        this.setState({ selectedService: service, isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    render() {
        const { currentPage, servicesPerPage, services, loading } = this.state;
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        const totalPages = Math.ceil(services.length / servicesPerPage);

        return (
            <>
                <div className='row'>
                    {loading && (
                        <div className="loading-container">
                            <LoadingIcons.TailSpin stroke="#000" />
                        </div>
                    )}
                    {currentServices.map(service => (
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

                {totalPages > 1 && (
                    <Pagination
                        itemsPerPage={servicesPerPage}
                        totalItems={services.length}
                        paginate={this.paginate}
                        currentPage={currentPage}
                    />
                )}
            </>
        )
    }
}

export default ServiceList