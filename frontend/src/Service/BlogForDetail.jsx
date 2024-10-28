import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../Configuration/AxiosConfig";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Client } from "@stomp/stompjs";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { Heart, Share2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify"; // Import thư viện thông báo

const BannerSection = styled.section`
  background-image: url("/img/blog/tintuc.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;
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

const Title1 = styled.h5`
  color: black;
  font-size: 18px;
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
    primary: "#667eea",
    secondary: "#764ba2",
    background: "#f7fafc",
    text: "#2d3748",
    white: "#ffffff",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
    xxlarge: "2rem",
  },
  space: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
};

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fonts.body};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Styled-components for blog detail
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${(props) => props.theme.space.medium};
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
  object-fit: cover;
`;

const Icon = styled.img`
  width: 60%;
  height: 60%;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: ${(props) => props.theme.space.large};
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #000000 0%, #555555 100%);
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.space.medium};
`;

const CardTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  margin: 0;
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.space.medium};
`;

const CardFooter = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #d3d3d3;

  color: ${(props) =>
    props.primary ? props.theme.colors.white : props.theme.colors.text};
  border: none;
  padding: ${(props) => props.theme.space.small}
    ${(props) => props.theme.space.medium};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa nội dung */
  font-size: ${(props) => props.theme.fontSizes.small};
  transition: background-color 0.3s ease;
  width: 70px;
  height: 50px;
  &:hover {
    background-color: ${(props) =>
      props.primary
        ? props.theme.colors.secondary
        : props.theme.colors.background};
  }

  svg {
    margin-right: ${(props) => props.theme.space.small};
  }
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  border-radius: 20px;
  gap: ${(props) => props.theme.space.small};
  position: sticky;
  bottom: 0; /* Đặt ở dưới cùng */
  background-color: #d3d3d3;
  padding: 10px;
  border: 1px solid #aaa;
  z-index: 1;
`;

const Input = styled.input`
  padding: ${(props) => props.theme.space.small};
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: ${(props) => props.theme.space.small};
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 4px;
  resize: none; /* Ngăn không cho người dùng thay đổi kích thước */
  height: 40px; /* Chiều cao cố định cho một dòng */
  overflow: hidden; /* Ẩn cuộn */
  width: 100%; /* Đảm bảo ô chiếm toàn bộ chiều rộng */
`;

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
  max-height: 450px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const CommentSectionWrapper = styled.div`
  border: 4px solid #ccc; /* Đặt border cho khung */
  border-radius: 10px; /* Bo tròn các góc */
  padding: 15px; /* Padding cho khung */
  margin-top: 20px; /* Khoảng cách phía trên khung */
`;

const CollapseLink = styled.a`
  color: #808080;
  text-decoration: none;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-top: 10px;
  margin-left: 50px;

  &:hover {
    text-decoration: underline;
  }
`;

const parseContent = (content, images) => {
  const sections = content.split("|");
  const parsedContent = [];
  let imageIndex = 0;

  sections.forEach((section, index) => {
    section = section.trim();

    if (section === "*image*") {
      if (imageIndex < images.length) {
        parsedContent.push(
          <StyledContainer key={`image-${imageIndex}`}>
            <StyledImage
              src={images[imageIndex++]}
              alt={`image-${imageIndex}`}
              style={{ width: "100%", margin: "1rem 0" }}
            />
          </StyledContainer>
        );
      }
    } else if (section.startsWith("*title1*")) {
      const title = section.replace("*title1*", "").trim();
      parsedContent.push(
        <Title1 key={`title-${index}`} style={{ margin: "1rem 0" }}>
          {title}
        </Title1>
      );
    } else if (section === "|||") {
      parsedContent.push(<br key={`break-${index}`} />);
    } else if (section) {
      parsedContent.push(
        <p
          key={`paragraph-${index}`}
          style={{ margin: "1rem 0", textAlign: "justify" }}
        >
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
  const [commentContent, setCommentContent] = useState("");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showComments, setShowComments] = useState(true);
  const stompClient = useRef(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const client = useRef(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/users/myInfo");
      setUser(response.result);
    }
  };

  const loadMoreComments = async () => {
    setCurrentPage(currentPage + 1);
    const newComments = await fetchComments(id);
    setComments((prevComments) => [...prevComments, ...newComments]);
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
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.current.onConnect = () => {

      stompClient.current.subscribe("/topic/comments", (message) => {
        const newCommentData = JSON.parse(message.body);

        if (newCommentData.type === "CREATE") {
          const newComment = newCommentData.comment;
          setComments((prevComments) => [newComment, ...prevComments]);
        } else if (newCommentData.type === "DELETE") {
          const deletedCommentId = newCommentData.comment.id;
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== deletedCommentId)
          );
          toast.success("Bình luận đã được xóa thành công");
        } else if (newCommentData.type === "UPDATE") {
          const updatedComment = newCommentData.comment;
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment
            )
          );
          toast.success("Bình luận đã được cập nhật thành công");
        } else {
          toast.error("Lỗi bình luận");
        }
      });
    };
    stompClient.current.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers["message"]}`);
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

    const imagesResponse = await axios.get(
      `/images/findImagesByBlog/${blogId}`
    );

    return {
      blog: blogResponse.result,
      images: imagesResponse.result.map((img) => `/img/blog/${img.image}`),
    };
  };

  const fetchComments = async (postId) => {
    const params = {
      page: currentPage,
      size: pageSize,
    };

    const commentsResponse = await axios.get(`/blogComments/byBlog/${postId}`, {
      params,
    });

    setTotalElements(commentsResponse.result.totalElements);

    setTotalPages(commentsResponse.result.totalPages);

    return commentsResponse.result.data || [];
  };

  const firtcomment = async (postId) => {
    const params = {
      page: 1,
      size: pageSize,
    };
    const commentsResponse = await axios.get(`/blogComments/byBlog/${postId}`, {
      params,
    });
    setTotalElements(commentsResponse.result.totalElements);
    setTotalPages(commentsResponse.result.totalPages);
    return commentsResponse.result.data || [];
  };
  const submitComment = async (commentData) => {
    const response = await axios.post("/blogComments", commentData);
    return response.result;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e); 
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentContent.trim() === "" || !user) {
      console.warn("User hoặc commentContent null");
      return;
    }

    const newComment = {
      userId: user.id,
      blogId: id,
      comment: commentContent,
    };

    const comment = await submitComment(newComment);
    setCommentContent("");
  };
  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/blogComments/${commentId}`);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.comment);
  };

  const handleUpdateComment = async (e, commentId) => {
    e.preventDefault();

    if (editedCommentContent.trim() === "") {
      console.warn("Nội dung bình luận không được để trống");
      return;
    }
    const comment = {
      comment: editedCommentContent,
    };

    await axios.put(`/blogComments/${commentId}`, comment);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: editedCommentContent }
          : comment
      )
    );

    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Banner section */}
      <BannerSection>
        <Overlay />
        <Container1>
          <Row>
            <AboutContent>
              <Title data-aos="zoom-in" data-aos-delay="100">
                Tin Tức
              </Title>
              <LinkNav>
                <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">
                  Home
                </StyledLink>
                <Arrow data-aos="fade-left" data-aos-delay="200">
                  →
                </Arrow>
                <StyledLink to="/blogs" data-aos="fade-left" data-aos-delay="0">
                  Tin Tức
                </StyledLink>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container1>
      </BannerSection>
      {/* Blog content */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                {post.user?.username && post.dateTimeEdit && (
                  <p>
                    Tác Giả: {post.user.username} | Ngày Đăng:{" "}
                    {post.createdDate}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {parseContent(post.body || "", images)}{" "}
                {/* Sử dụng post.body */}
              </CardContent>
              <CardFooter>
                <Button>
                  <Share2 size={16} /> Share
                </Button>
              </CardFooter>
            </Card>

            {/* Display comments */}
            <h3>Bình luận</h3>
            <CommentSectionWrapper>
              {" "}
              {/* Thêm khung xung quanh phần bình luận */}
              <CommentContainer>
                {showComments && (
                  <div>
                    {comments.length === 0 ? (
                      <p>Chưa có bình luận nào cho bài viết này.</p>
                    ) : (
                      comments.map((comment, index) => (
                        <CommentWrapper key={`${comment.id}-${index}`}>
                          <Avatar
                            src={`/img/user/${comment.user.avatar}`}
                            alt="Avatar"
                          />
                          <CommentContent>
                            <CommentContainer>
                              <CommentBody>
                                <UserName>
                                  {comment.user
                                    ? comment.user.username
                                    : "Người dùng không xác định"}
                                </UserName>
                                {editingCommentId === comment.id ? (
                                  <CommentForm
                                    onSubmit={(e) =>
                                      handleUpdateComment(e, comment.id)
                                    }
                                  >
                                    <TextArea
                                      value={editedCommentContent}
                                      onChange={(e) =>
                                        setEditedCommentContent(e.target.value)
                                      }
                                      required
                                      rows="2"
                                    />
                                    <Button type="submit" primary>
                                      Lưu
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={() => setEditingCommentId(null)}
                                    >
                                      Hủy
                                    </Button>
                                  </CommentForm>
                                ) : (
                                  <CommentText>{comment.comment}</CommentText>
                                )}
                              </CommentBody>
                              <CommentFooter>
                                {comment.createdDate === null &&
                                comment.dateUpdate !== null ? (
                                  <span style={{ marginRight: "20px" }}>
                                    Vừa xong
                                  </span>
                                ) : (
                                  <span style={{ marginRight: "20px" }}>
                                    {comment.createdDate}
                                  </span>
                                )}
                                <ActionButton
                                  onClick={() => handleEditComment(comment)}
                                >
                                  {comment.user && comment.user.id === user?.id
                                    ? "Sửa"
                                    : null}
                                </ActionButton>
                                <ActionButton
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                >
                                  {comment.user && comment.user.id === user?.id
                                    ? "Xóa"
                                    : null}
                                </ActionButton>
                              </CommentFooter>
                            </CommentContainer>
                          </CommentContent>
                        </CommentWrapper>
                      ))
                    )}
                    {currentPage < totalPages + 1 && (
                      <CollapseLink onClick={loadMoreComments}>
                        Xem thêm bình luận
                      </CollapseLink>
                    )}
                    {comments.length > 3 && (
                      <CollapseLink onClick={resetComments}>
                        Thu gọn
                      </CollapseLink>
                    )}
                  </div>
                )}
              </CommentContainer>
              {/* Comment form */}
              {user ? (
                <CommentForm onSubmit={handleCommentSubmit}>
                  <TextArea
                    placeholder="Nội dung bình luận"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <Button type="submit" primary style={{ padding: "0 10px" }}>
                    <Icon src="/img/send.jpg" />
                  </Button>
                </CommentForm>
              ) : (
                <NavMenuLink
                  href="/authentication"
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Bạn cần Đăng nhập để được bình luận
                </NavMenuLink>
              )}
            </CommentSectionWrapper>
          </motion.div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default BlogDetail;
