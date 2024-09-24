import { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';

// Giả lập API calls
const fetchBlogPost = async (id) => {
  return {
    id,
    title: "Khám phá vẻ đẹp Việt Nam",
    content: "Việt Nam là một đất nước tuyệt vời với nhiều cảnh đẹp tự nhiên.|*image*|Đây là một đoạn văn khác để miêu tả vẻ đẹp của các vùng miền.|*title1*|Vùng núi và biển.|*image*|Nơi này nổi tiếng với cảnh quan tuyệt đẹp.",
    author: "Nguyễn Văn A",
    date: "2023-09-24",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592",
      "https://th.bing.com/th/id/R.fc9960d57927fd1df218d145024ff6f0?rik=Gv973um4VW1JFw&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.4d650298d3d9e1d50c951e22638ccbb2?rik=8e3Zgs0OlStDTA&pid=ImgRaw&r=0"
    ]
  };
};

const fetchComments = async (postId) => {
  return [
    { id: "1", author: "Trần Thị B", content: "Bài viết rất hay!", date: "2023-09-25" },
    { id: "2", author: "Lê Văn C", content: "Tôi rất thích Việt Nam!", date: "2023-09-26" },
    { id: "3", author: "Phạm Thị D", content: "Bài viết này rất hữu ích.", date: "2023-09-27" }
  ];
};

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

// Styled-components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.space.medium};
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  margin-bottom: ${props => props.theme.space.large};
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
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

const parseContent = (content, images) => {
  const sections = content.split('|*');
  const parsedContent = [];
  let imageIndex = 0;

  sections.forEach((section, index) => {
    section = section.trim();
    if (section.startsWith('image*')) {
      // Render image if available
      if (imageIndex < images.length) {
        parsedContent.push(
          <img
            key={`image-${imageIndex}`}
            src={images[imageIndex++]}
            alt={`image-${imageIndex}`}
            style={{ width: '100%', margin: '1rem 0' }}
          />
        );
      }
    } else if (section.startsWith('title1*')) {
      const title = section.replace('title1*', '').trim();
      parsedContent.push(
        <h3 key={`title-${index}`} style={{ margin: '1rem 0' }}>
          {title}
        </h3>
      );
    } else if (section) {
      // Render paragraph
      parsedContent.push(
        <p key={`paragraph-${index}`} style={{ margin: '1rem 0' }}>
          {section}
        </p>
      );
    }
  });

  return parsedContent;
};

const BlogDetail = ({ postId = "1" }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchBlogPost(postId);
      setPost(postData);
      const commentsData = await fetchComments(postId);
      setComments(commentsData);
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <HeroSection>
          <HeroImage src={post.images[0]} alt={post.title} />
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
              {parseContent(post.content, post.images)}
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

          <h3>Comments</h3>
          {comments.map(comment => (
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
  );
};

export default BlogDetail;
