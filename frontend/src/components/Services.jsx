import React from 'react'
import ServiceList from '../Service/ServiceList'
import { useLocation } from 'react-router-dom'
import '../assets/Css/Service.css'

const Services = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceTypeId = searchParams.get('serviceTypeId');

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <ServiceList serviceTypeId={serviceTypeId} />
        </div>
      </section>
    </>
  )
}

export default Services