import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 0;
  background-color: #f9f9ff;
  user-select: none;
  outline: none;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-size: 36px;
  color: #222;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 50px;
  color: #777;
  font-size: 16px;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const BlogPost = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTags = styled.div`
  margin-bottom: 10px;
`;

const Tag = styled.a`
  background: #f1f1f1;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 20px;
  color: #333;
  text-decoration: none;
  font-size: 12px;
  transition: background 0.3s ease;

  &:hover {
    background: #e1e1e1;
  }
`;

const BlogTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  color: #222;
`;

const BlogExcerpt = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
`;

const BlogDate = styled.span`
  color: #999;
  font-size: 12px;
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  background: ${({ isActive }) => (isActive ? '#007bff' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : '#333')};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const BlogArea = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const blogPosts = [
    { image: '/image/b1.jpg', tags: ['Travel', 'Life Style'], title: 'Low Cost Advertising', excerpt: 'Acres of Diamonds…', date: '31st January, 2018' },
    { image: '/image/b2.jpg', tags: ['Travel', 'Life Style'], title: 'Creative Outdoor Ads', excerpt: 'Acres of Diamonds…', date: '31st January, 2018' },
    { image: '/image/b3.jpg', tags: ['Travel', 'Life Style'], title: 'It is Classified', excerpt: 'Acres of Diamonds…', date: '31st January, 2018' },
    { image: '/image/b4.jpg', tags: ['Tech', 'Innovation'], title: 'Tech Revolution', excerpt: 'Embrace the change…', date: '15th February, 2018' },
    { image: '/image/b5.jpg', tags: ['Health', 'Life Style'], title: 'Healthy Living Tips', excerpt: 'Staying fit…', date: '22nd March, 2018' },
    { image: '/image/b6.jpg', tags: ['Food', 'Life Style'], title: 'Top 10 Restaurants', excerpt: 'Explore the best…', date: '30th April, 2018' },
  ];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <Section>
      <Container>
        <Title>Latest from Our Blog</Title>
        <Subtitle>Discover our most recent articles and stay updated with the latest trends and insights.</Subtitle>
        <BlogGrid>
          {currentPosts.map((post, index) => (
            <BlogPost key={index}>
              <BlogImage src={post.image} alt={post.title} />
              <BlogContent>
                <BlogTags>
                  {post.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} href="#">{tag}</Tag>
                  ))}
                </BlogTags>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogDate>{post.date}</BlogDate>
              </BlogContent>
            </BlogPost>
          ))}
        </BlogGrid>
        
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton 
              key={i + 1} 
              onClick={() => paginate(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </Container>
    </Section>
  );
};

export default BlogArea;
