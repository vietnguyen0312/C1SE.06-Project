import React, { useEffect, useState , useRef} from 'react';
import { useParams } from 'react-router-dom'; 
import axios from '../Configuration/AxiosConfig';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

import { Heart, Share2 } from 'lucide-react';
import { BannerSection2 } from '../Layout/PublicLayout/Home/style';


export const NavMenuLink = styled.a`
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: block;

  &:hover {
    color: #f8b600;
    
  }
`;
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

const Title1 = styled.h3`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: bold;
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
  background: linear-gradient(135deg, #000000 0%, #555555 100%);
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

// Styled-components cho bình luận
const CommentWrapper = styled.div`

    border-radius: 8px;
    padding: 5px;
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
  
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const CommentContent = styled.div`
    flex: 1;
    display: flex;



`;

const UserName = styled.div`
    font-weight: bold;
    color: #333; // Màu chữ tên người dùng
`;

const CommentText = styled.p`
    margin: 5px 0;
    color: #555; // Màu chữ nội dung bình luận
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-start; 
  margin-top: 10px; 
  font-size: 0.8rem;
`;

const ActionButton = styled.span`
    cursor: pointer;
    margin-right: 20px;
    &:hover {
        color: #007bff; // Màu khi hover
    }
`;


const CommentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Đảm bảo CommentText và CommentFooter được xếp theo chiều dọc */
  padding: 10px; 
  border-radius: 10px; 

`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column; /* Đảm bảo CommentText và CommentFooter được xếp theo chiều dọc */
  padding: 10px; 
  background-color: #ffffff; 
  border-radius: 10px; 
  border: 1px solid #ccc;
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
        <Title1 key={`title-${index}`} style={{  margin: '1rem 0' }}>
          <b>{title}</b>
        </Title1>
      );
    } else if (section === '|||') {
      parsedContent.push(<br key={`break-${index}`} />);
    } else if (section) {
      parsedContent.push(
        <p key={`paragraph-${index}`} style={{ margin: '1rem 0', textAlign: 'justify' }}>
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
  const [commentContent, setCommentContent] = useState('');
  const [user, setUser] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showComments, setShowComments] = useState(true); 
  const stompClient = useRef(null); 


  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.get('/users/myInfo');
        setUser(response.result); 

    }
  };
   
   
  const loadMoreComments = async () => {
    setCurrentPage(currentPage + 1); 
    const newComments = await fetchComments(id); 
    setComments(prevComments => [...prevComments, ...newComments]); 
  };

 
  const resetComments = async () => {
    setComments([]); 
    setCurrentPage(2); 
    setTotalElements(0); 
    setTotalPages(0);

    const newComments = await firtcomment(id); 
    setComments(newComments); 
};


  useEffect(() => {
    const fetchData = async () => {
      fetchUser(); 
      const { blog, images } = await getBlogWithImages(id);
      loadMoreComments();
      setPost(blog);
      setImages(images);     
    };

    fetchData();
  }, [id]);
  
  useEffect(() => {
  
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, 
      debug: (str) => console.log(str),
    })
    stompClient.current.onConnect = () => {
      console.log('Connected to WebSocket server');

     
      stompClient.current.subscribe('/topic/comments', (message) => {
        console.log('Received comment:', message.body); 
        if (message.body) {
            try {
                const newComment = JSON.parse(message.body); 
                console.log('Parsed comment:', newComment);
                console.log('User Name:', newComment.user.username);
                setComments(prevComments => [newComment, ...prevComments]);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
      });
    };
    stompClient.current.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers['message']}`);
      console.error(`Additional details: ${frame.body}`);
    };

    stompClient.current.activate(); 
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate(); 
      }
    };
  }, []);
  const getBlogWithImages = async (blogId) => {
    const blogResponse = await axios.get(`/blogs/${blogId}`);

    const imagesResponse = await axios.get(`/images/findImagesByBlog/${blogId}`);
    
    return {
      blog: blogResponse.result,
      images: imagesResponse.result.map((img) => `/img/blog/${img.image}`),
    };
  };

  const fetchComments = async (postId) => {
        const params = {
          page: currentPage ,
          size: pageSize,
      };

      const commentsResponse = await axios.get(`/blogComments/byBlog/${postId}`, { params });

      setTotalElements(commentsResponse.result.totalElements);

      setTotalPages(commentsResponse.result.totalPages);

      return commentsResponse.result.data || [];

  };


  const firtcomment = async (postId) => {
    const params = {
      page: 1 ,
      size: pageSize,
  };
  const commentsResponse = await axios.get(`/blogComments/byBlog/${postId}`, { params });
  setTotalElements(commentsResponse.result.totalElements);
  setTotalPages(commentsResponse.result.totalPages);
  return commentsResponse.result.data || [];

  };
  const submitComment = async (commentData) => {
        
        const response = await axios.post('/blogComments', commentData);
        return response.result;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (commentContent.trim() === '' || !user) {
        console.warn("User hoặc commentContent null");
        return; 
    }

    const newComment = {
        userId: user.id,
        blogId: id,
        comment: commentContent,
    };

        const comment = await submitComment(newComment); 
        setComments(prevComments => [comment, ...prevComments]); 
        setCommentContent(''); 

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
          {/* <HeroSection>
            <HeroImage src={images[0]} alt={post.title} />
            <HeroOverlay />
            <HeroTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {post.title}
            </HeroTitle>
          </HeroSection> */}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                {post.user?.username && post.dateTimeEdit && (
                  <p>Tác Giả: {post.user.username} | Ngày Đăng: {post.createdDate}</p>
                )}
             
              </CardHeader>
              <CardContent>
                {parseContent(post.body || '', images)} {/* Sử dụng post.body */}
              </CardContent>
              <CardFooter>
                <Button>
                  <Share2 size={16} /> Share
                </Button>
              </CardFooter>
            </Card>

            {/* Comment form */}
            {user ? ( 
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
            ) : (
              <NavMenuLink href="/authentication">Ban cần Đăng nhập để được binh luận </NavMenuLink>
          )}

            {/* Display comments */}
            <h3>Bình luận</h3>
            {showComments && ( 
    <div className='comment-container' style={{ border: '3px solid #ccc', padding: '10px', borderRadius: '10px', maxHeight: '500px', overflowY: 'auto' }}>
        {comments.length === 0 ? ( 
            <p>Chưa có bình luận nào cho bài viết này.</p> 
        ) : (
            comments.map((comment, index) => (
                <CommentWrapper key={`${comment.id}-${index}`}> {/* Kết hợp id với index để tạo key duy nhất */}
                    <Avatar src="/img/user/{comment.user.avatar}" alt="Avatar" />
                    <CommentContent>
                        <CommentContainer>
                            <CommentBody>
                            <UserName>{comment.user ? comment.user.username : 'Người dùng không xác định'}</UserName>
                                <CommentText>{comment.comment}</CommentText>
                            </CommentBody>
                            <CommentFooter>
                            {comment.createdDate === null && comment.dateUpdate !== null ? (
                                  <span style={{ marginRight: '20px' }}>Vừa xong</span>
                              ) : (
                                  <span style={{ marginRight: '20px' }}>{comment.createdDate}</span>
                              )}
                                <ActionButton>{comment.user && comment.user.id === user?.id ? 'Sửa' : null}</ActionButton>
                                <ActionButton>{comment.user && comment.user.id === user?.id ? 'Xóa' : null}</ActionButton>
                            </CommentFooter>
                        </CommentContainer>
                    </CommentContent>
                </CommentWrapper>
            ))
        )}
        {currentPage < totalPages && ( 
            <Button onClick={loadMoreComments}>Xem thêm bình luận</Button>
        )}
        {comments.length > 3 && ( 
            <Button type="button" onClick={resetComments}>Thu gọn</Button>
        )}
    </div>
        )}
          </motion.div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default BlogDetail;