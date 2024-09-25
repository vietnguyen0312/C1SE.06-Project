import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons'
import axios from '../Configuration/AxiosConfig'; // Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn
import styled from 'styled-components';

export const NavMenuLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: block;

  &:hover {
    color: #f8b600;
    
  }
`;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm dòng này để tích hợp Bootstrap JS
class ServiceTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceTypes: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchServiceTypes();
    }

    fetchServiceTypes = async () => {
        const response = await axios.get('/serviceTypes');
        this.setState({ serviceTypes: response.result, loading: false });
    };

    render() {
        const { serviceTypes, loading } = this.state;

        return (
            <>
                {loading && (
                    <div className="loading-container">
                        <LoadingIcons.TailSpin stroke="#000" />
                    </div>
                )}
                {serviceTypes.map(serviceTypes => (
                    <li key={serviceTypes.id}>
                        <NavMenuLink style={{ color: 'black' }} className="dropdown-item" href={`/services?serviceTypeId=${serviceTypes.id}`}>
                            {serviceTypes.name}
                        </NavMenuLink>
                    </li>
                ))}
            </>
        );
    }
}

export default ServiceTypeList;
