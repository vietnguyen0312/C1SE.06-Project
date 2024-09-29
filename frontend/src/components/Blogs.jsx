import React from 'react'
import BlogList from '../Service/BlogList'
import { useLocation } from 'react-router-dom'




const Blogs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogTypeId = searchParams.get('blogTypeId');

  return (
    <>
      <section >
        <BlogList blogTypeId={blogTypeId} />
      </section>
    </>
  )
}

export default Blogs
