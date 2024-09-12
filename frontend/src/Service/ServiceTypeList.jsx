import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons'
import axios from './axios-customize'; // Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn

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
        try {
            const response = await axios.get('/serviceTypes');
            this.setState({ serviceTypes: response.result, loading: false });
        } catch (error) {
            console.error('Error fetching service types:', error);
            this.setState({ loading: false, error: 'Failed to load service types' });
        }
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
                    <li key={serviceTypes.id}><a href={`/services?serviceTypeId=${serviceTypes.id}`}>{serviceTypes.name}</a></li>
                ))}
            </>
        );
    }
}

export default ServiceTypeList;
