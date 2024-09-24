import React from 'react'
import ServiceList from '../Service/ServiceList'
import { useLocation } from 'react-router-dom'
import '../Style/Service.css'

const Services = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceTypeId = searchParams.get('serviceTypeId');
  const page = searchParams.get('page');
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <ServiceList serviceTypeId={serviceTypeId} currentPage={page} />
        </div>
      </section>
    </>
  )
}

export default Services