import React, { useEffect } from 'react'
import ServiceList from '../Service/ServiceList'
import FilterBar from './FilterBar'
import axios from '../Configuration/AxiosConfig'
import { useLocation } from 'react-router-dom'
import '../Style/Service.css'

const Services = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceTypeId = searchParams.get('serviceTypeId');
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    const fetchServiceType = async () => {
      const response = await axios.get('/serviceTypes');
      const data = await response.json();
      console.log(data);
    };
    fetchServiceType();
  }, [serviceTypeId]);

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <ServiceList serviceTypeId={serviceTypeId}/>
        </div>
      </section>
      <FilterBar />
    </>
  )
}

export default Services