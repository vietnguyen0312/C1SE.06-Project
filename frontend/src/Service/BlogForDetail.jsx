import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from '../Configuration/AxiosConfig';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { BannerSection2 } from '../Layout/PublicLayout/Home/style';

// Styled-components
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container1 = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;

const Title1 = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const Arrow = styled.span`
  margin: 0 10px;
`;

// Theme cho styled-components
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#f7fafc',
    text: '#2d3748',
    white: '#ffffff',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  space: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
};

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Styled-components for blog detail
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.space.medium};
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  margin-bottom: ${props => props.theme.space.large};
  overflow: hidden;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  object-fit: contain; 
`;

const HeroImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroTitle = styled(motion.h1)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  font-weight: bold;
  text-align: center;
  padding: ${props => props.theme.space.medium};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: ${props => props.theme.space.large};
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space.medium};
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xlarge};
  margin: 0;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.space.medium};
`;

const CardFooter = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.space.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.small};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.background};
  }

  svg {
    margin-right: ${props => props.theme.space.small};
  }
`;

const CommentForm = styled.form`
  margin: ${props => props.theme.space.large} 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.small};
`;

const Input = styled.input`
  padding: ${props => props.theme.space.small};
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.space.small};
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 4px;
  resize: vertical;
`;

const parseContent = (content, images) => {
  const sections = content.split('|');
  const parsedContent = [];
  let imageIndex = 0;

  sections.forEach((section, index) => {
    section = section.trim();
    
    if (section === '*image*') {
      if (imageIndex < images.length) {
        parsedContent.push(
          <StyledContainer key={`image-${imageIndex}`}>
            <StyledImage
              src={images[imageIndex++]}
              alt={`image-${imageIndex}`}
              style={{ width: '100%', margin: '1rem 0' }}
            />
          </StyledContainer>
        );
      }
    } else if (section.startsWith('*title1*')) {
      const title = section.replace('*title1*', '').trim();
      parsedContent.push(
        <h3 key={`title-${index}`} style={{ margin: '1rem 0' }}>
          {title}
        </h3>
      );
    } else if (section === '|||') {
      parsedContent.push(<br key={`break-${index}`} />);
    } else if (section) {
      parsedContent.push(
        <p key={`paragraph-${index}`} style={{ margin: '1rem 0' }}>
          {section}
        </p>
      );
    }
  });

  return parsedContent;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { blog, images } = await getBlogWithImages(id);
      setPost(blog);
      setImages(images);
      console.log("hình ảnh "+ images);
    };

    fetchData();
  }, [id]);

  const getBlogWithImages = async (blogId) => {
    const blogResponse = await axios.get(`/blogs/${blogId}`);
    const imagesResponse = await axios.get(`/images/findImagesByBlog/${blogId}`);
    return {
      blog: blogResponse.result,
      images: imagesResponse.result.map((img) => `/img/blog/${img.image}`),
    };
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (author && commentContent) {
      const newComment = {
        id: (comments.length + 1).toString(),
        author: author,
        content: commentContent,
        date: new Date().toISOString().split('T')[0],
      };
      setComments([...comments, newComment]);
      setAuthor('');
      setCommentContent('');
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Banner section */}
      <BannerSection2>
        <Overlay />
        <Container1>
          <Row>
            <AboutContent>
              <Title1>Tin Tức</Title1>
              <LinkNav>
                <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container1>
      </BannerSection2>

      {/* Blog content */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <HeroSection>
            <HeroImage src={images[0]} alt={post.title} />
            <HeroOverlay />
            <HeroTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {post.title}
            </HeroTitle>
          </HeroSection>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p>By {post.author} | {post.date}</p>
              </CardHeader>
              <CardContent>
                {parseContent(post.body || '', images)} {/* Sử dụng post.body */}
              </CardContent>
              <CardFooter>
                <Button primary>
                  <Heart size={16} /> Like
                </Button>
                <Button>
                  <Share2 size={16} /> Share
                </Button>
              </CardFooter>
            </Card>

            {/* Comment form */}
            <CommentForm onSubmit={handleCommentSubmit}>
              <TextArea
                placeholder="Nội dung bình luận"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
                rows="4"
              />
              <Button type="submit" primary>Gửi bình luận</Button>
            </CommentForm>

            {/* Display comments */}
            <h3>Bình luận</h3>
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent>
                  <p><strong>{comment.author}</strong> ({comment.date})</p>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default BlogDetail;
