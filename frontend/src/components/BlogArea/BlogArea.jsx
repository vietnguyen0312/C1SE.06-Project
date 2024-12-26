import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonCPN from "../../components/Button/Button";
import { Title, Subtitle } from "../TestimonialArea/TestimonialArea";
import { motion } from "framer-motion";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "../../Configuration/AxiosConfig";
import { Link } from 'react-router-dom';
const Section = styled.section`
  padding: 80px 0;
  user-select: none;
  outline: none;
  position: relative;
  overflow: hidden;
  background-color: #fff;
`;

const HalfBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  background-color: #fff5da;
  z-index: 0;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 1;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  font-family: "PTSerif";
`;

const BlogPost = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: fill;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h3`
  margin: 10px 20px;
  font-size: 20px;
  color: #222;
`;

const BlogDate = styled.span`
  color: white;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  background-color: #f8b600;
  padding: 5px 10px;
  border-radius: 10px 0 0 0;
  font-weight: bold;
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content1 = styled.div`
  cursor: pointer;
`;

const BlogArea = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBlog = async () => {
    const params = {
      page: currentPage,
      size: 3,
    };
    const blogResponse = await axios.get(`/blogs`, { params });
    console.log(blogResponse.result.data);
    const blogWithImages = await Promise.all(
      blogResponse.result.data.map(async (blog) => {
        const imagesResponse = await axios.get(
          `/blogImage/findImagesByBlog/${blog.id}`
        );
        const commentResponse = await axios.get(
          `/blogComments/byBlog/${blog.id}`
        );
        console.log(commentResponse.result);
        console.log(imagesResponse.result);
        console.log(commentResponse);
        const commentsCount = commentResponse.result.totalElements;
        return {
          ...blog,
          images: imagesResponse.result[0] || null,
          comments: commentsCount,
        };
      })
    );
    setTotalPages(blogResponse.result.totalPages);
    setCurrentPage(blogResponse.result.currentPage);
    setBlogPosts(blogWithImages);
  };

  useEffect(() => {
    fetchBlog();
    Aos.init({ duration: 500 });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Section data-aos="fade-up">
      <HalfBackground />
      <Container>
        <Header>
          <div>
            <Title>From the blog post</Title>
            <Subtitle>Tin tức & Bài viết</Subtitle>
          </div>
          <Link to="/blogs">
            <ButtonCPN text="View All Posts" style={{ width: "160px" }} />
          </Link>
        </Header>
        <BlogGrid>
          {blogPosts.map((post, index) => (
            <BlogPost key={index}>
              <Link to={`/blogDetail/${post.id}`} style={{ textDecoration: 'none', color: "#f8b600" }}>
                <div style={{ position: "relative" }}>
                  <BlogImage
                    src={post.images ? `${post.images.image}` : '/img/default-image.jpg'}
                    alt={post.title}
                  />
                  <BlogDate>{post.createdDate}</BlogDate>
                </div>
                <BlogContent>
                  <div style={{ display: "flex", gap: "20px", margin: "0 20px" }}>
                    <Content1>
                      <UserOutlined style={{ color: "#f8b600" }} />{" "}
                      {post.user ? post.user.name : "Admin"}
                    </Content1>
                    <Content1>
                      <CommentOutlined style={{ color: "#f8b600" }} />{" "}
                      {post.comments} Comments
                    </Content1>
                  </div>
                  <BlogTitle>{post.title}</BlogTitle>
                </BlogContent>
              </Link>
            </BlogPost>
          ))}
        </BlogGrid>

        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePageChange(index + 1)}
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                margin: "0 5px",
                padding: "0",
                backgroundColor:
                  currentPage === index + 1 ? "#f8b600" : "#ffffff",
                border: `2px solid ${currentPage === index + 1 ? "#f8b600" : "#cccccc"
                  }`,
                color: currentPage === index + 1 ? "#ffffff" : "#333333",
                cursor: "pointer",
              }}
            ></motion.button>
          ))}
        </Pagination>
      </Container>
    </Section>
  );
};

export default BlogArea;