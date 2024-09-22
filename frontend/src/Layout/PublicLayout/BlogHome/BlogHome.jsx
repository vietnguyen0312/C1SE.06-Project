import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BannerSection2 } from '../Home/style';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  margin: 0 10px;
`;

const TopBlog = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 80px 80px 0 80px;
`;

const BlogItem = styled.div`
  width: 30%; 
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
`;

const BlogContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; 
  height: 80%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.796);
  color: white;
  padding: 20px;
  text-align: center;
  opacity: 1; 

  h3 {
    font-size: 24px; 
    margin-bottom: 10px;
  }
  p {
    font-size: 16px; 
  }
  &:hover{
    background: rgba(231, 199, 116, 0.9);
  }
`;

const PostContentArea = styled.section`
  padding: 60px 0;
`;

const MetaDetails = styled.div`
  .tags {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    li {
      display: inline;
      margin-right: 10px;
      a {
        color: #007bff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .user-details {
    display: flex;
    flex-wrap: wrap;
    .user-name, .date, .view, .comments {
      flex: 1 1 50%;
      margin-bottom: 10px;
      a {
        color: #333;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      span {
        margin-left: 5px;
      }
    }
  }
`;

const FeatureImg = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const PostsTitle = styled.a`
  h3 {
    font-size: 24px;
    color: #333;
    margin: 20px 0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Excerpt = styled.p`
  font-size: 16px;
  color: #666;
`;

const PrimaryBtn = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      margin: 0 5px;
      a {
        padding: 5px 10px;
        background: #f0f0f0;
        border-radius: 3px;
        text-decoration: none;
        color: #333;
        &:hover {
          background: #007bff;
          color: white;
        }
      }
    }
  }
`;
const BlogHome = () => {
    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);
  
    const topic = [
      { image: './img/blog/b1.jpg', title: 'Traveling', description: 'The preservation of human life is the ultimate value, a pillar of ethics and the foundation.' },
      { image: './img/blog/b2.jpg', title: 'Politics', description: 'The preservation of human life is the ultimate value, a pillar of ethics and the foundation.' },
      { image: './img/blog/b3.jpg', title: 'Food', description: 'The preservation of human life is the ultimate value, a pillar of ethics and the foundation.' },
    ];
  
    const posts = [
      {
        tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
        author: 'Mark Wiens',
        date: '12 Dec, 2017',
        views: '1.2M Views',
        comments: '06 Comments',
        image: 'img/blog/feature-img1.jpg',
        title: 'Astronomy Binoculars A Great Alternative',
        excerpt: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.'
      },
      {
        tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
        author: 'Mark Wiens',
        date: '12 Dec, 2017',
        views: '1.2M Views',
        comments: '06 Comments',
        image: 'img/blog/feature-img2.jpg',
        title: 'The Basics Of Buying A Telescope',
        excerpt: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.'
      }
    ];
  
    return (
      <>
        <BannerSection2>
          <Overlay />
          <Container>
            <Row>
              <AboutContent>
                <Title>Blog Home</Title>
                <LinkNav>
                  <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                  <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                  <StyledLink to="/blog" data-aos="fade-left" data-aos-delay="100">Blog</StyledLink>
                  <Arrow data-aos="fade-left" data-aos-delay="50">→</Arrow>
                  <StyledLink to="/blogHome" data-aos="fade-left" data-aos-delay="25">Blog Home</StyledLink>
                </LinkNav>
              </AboutContent>
            </Row>
          </Container>
        </BannerSection2>
        <TopBlog>
          {topic.map((item, index) => (
            <BlogItem key={index}>
              <BlogImage src={item.image} alt={item.title} />
              <BlogContent>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </BlogContent>
            </BlogItem>
          ))}
        </TopBlog>
        
        <div className="single-post row">
          {posts.map((post, index) => (
            <div key={index} className="col-lg-3 col-md-3 meta-details">
              <MetaDetails>
                <ul className="tags">
                  {post.tags.map((tag, tagIndex) => (
                    <li key={tagIndex}><a href="#">{tag},</a></li>
                  ))}
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">{post.author}</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">{post.date}</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">{post.views}</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">{post.comments}</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </MetaDetails>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default BlogHome;
  