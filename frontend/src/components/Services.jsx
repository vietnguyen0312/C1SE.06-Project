import React from 'react'
import ServiceList from './Api/ServiceList'
import '../Css/Service.css'

function Services() {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <ServiceList />
          </div>
        </div>
      </section>
    </>
  )
}

export default Services