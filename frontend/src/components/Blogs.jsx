import React from 'react'
import BlogList from '../Service/BlogList'
import { useLocation } from 'react-router-dom'
// import '../Style/Blog.css'

const Blogs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogTypeId = searchParams.get('blogTypeId');

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <BlogList blogTypeId={blogTypeId} />
        </div>
      </section>
    </>
  )
}

export default Blogs
