import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../Configuration/AxiosConfig";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Client } from "@stomp/stompjs";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonCPN from "../components/Button/Button";
import { toast } from "react-toastify";

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

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${(props) => props.theme.space.medium};
`;

const StyledContainer = styled.div`
  width: 100%;
  height: auto;
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

const CommentForm = styled.form`
  display: flex;
  border-radius: 20px;
  height: 200px;
  gap: ${(props) => props.theme.space.small};
  position: sticky;
  bottom: 0; /* Đặt ở dưới cùng */
  background-color: #f0f0f0;
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
  resize: none;
  height: 40px;
  overflow: hidden; 
  width: 100%;
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
  color: #333; 
`;

const CommentText = styled.p`
  margin: 5px 0;
  color: #555; 
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
    color: #007bff; 
  }
`;

const CommentContainer = styled.div`
  max-height: 650px;
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
  border: 4px solid #ccc; 
  border-radius: 10px;
  padding: 15px; 
  margin-top: 20px; 
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
    } else if (section === "|||") {
      parsedContent.push(<br key={`break-${index}`} />);
    } else if (section) {
      parsedContent.push(
        <p
          key={`paragraph-${index}`}
          style={{ margin: "1rem 0", textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: section }}
        />
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
      console.log("images", images);
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
        } else if (newCommentData.type === "UPDATE") {
          const updatedComment = newCommentData.comment;
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment
            )
          );
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
      `/blogImage/findImagesByBlog/${blogId}`
    );

    return {
      blog: blogResponse.result,
      images: imagesResponse.result.map((img) => `${img.image}`),
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
    console.log(commentsResponse.result.data);
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
  const submitComment = async (content) => {
    const newComment = {
      userId: user.id,
      blogId: id,
      comment: content,
    };
    await axios.post("/blogComments", newComment);
    toast.success("Bình luận của bạn đã được thêm thành công");
    loadMoreComments();
  };

  const CheckCommentLength = (commentContent) => {
    if (commentContent.trim() === "" || !user) {
      console.warn("User hoặc commentContent null");
      return false;
    }
    if (commentContent.length > 300) {
      toast.error("Bình luận không được quá 300 ký tự");
      return false;
    }
    return true;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!CheckCommentLength(commentContent)) {
      return;
    }
    const commentJson = JSON.stringify(commentContent);
    console.log("commentJson", commentJson);

    await submitComment(commentJson);
    setCommentContent("");
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/blogComments/${commentId}`);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
    toast.success("Bình luận đã được xóa thành công");
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    const convertComment = convertJson({ content: comment.comment });
    setEditedCommentContent(convertComment);
    console.log(convertComment);
  };

  const handleUpdateComment = async (e, commentId) => {
    e.preventDefault();

    if (!CheckCommentLength(editedCommentContent)) {
      return;
    }
    const comment = {
      comment: JSON.stringify(editedCommentContent),
    };
    console.log(typeof editedCommentContent);
    await axios.put(`/blogComments/${commentId}`, comment);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: JSON.stringify(editedCommentContent) }
          : comment
      )
    );
    toast.success("Bình luận đã được cập nhật thành công");
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const convertJson = ({ content }) => {
    console.log("commenthah", content);
    const parsedComment = JSON.parse(content);

    return parsedComment;
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
                <div>
                  {post.contentOpen}
                </div>
                {parseContent(post.body || "", images)}{" "}
              </CardContent>
              <CardFooter>
                <ButtonCPN
                  text="Chia sẻ"
                  style={{
                    padding: "0 10px",
                    height: "40px",
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </CardFooter>
            </Card>
            <h3>Bình luận</h3>
            <CommentSectionWrapper>
              {" "}
              <CommentContainer>
                {showComments && (
                  <div>
                    {comments.length === 0 ? (
                      <p>Chưa có bình luận nào cho bài viết này.</p>
                    ) : (
                      comments.map((comment, index) => (
                        <CommentWrapper key={`${comment.id}-${index}`}>
                          <Avatar
                            src={
                              comment.user.avatar
                                ? `/img/User/${comment.user.avatar}`
                                : comment.user.gender === "Male"
                                ? "/img/User/male.jpg"
                                : "/img/User/female.jpg"
                            }
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
                                    <ReactQuill
                                      value={editedCommentContent}
                                      onChange={setEditedCommentContent} 
                                      required
                                      style={{ height: "100px", width: "100%" }}
                                    />
                                    <ButtonCPN
                                      type="submit"
                                      primary
                                      style={{
                                        padding: "0 10px",
                                        height: "40px",
                                        width: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      text="Lưu"
                                    ></ButtonCPN>
                                    <ButtonCPN
                                      type="button"
                                      text="hủy"
                                      style={{
                                        padding: "0 10px",
                                        height: "40px",
                                        width: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      onClick={() => setEditingCommentId(null)}
                                    >
                                      Hủy
                                    </ButtonCPN>
                                  </CommentForm>
                                ) : (
                                  <CommentText>
                                    <div>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: convertJson({
                                            content: comment.comment,
                                          }),
                                        }}
                                      />
                                    </div>
                                  </CommentText>
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
                  <ReactQuill
                    value={commentContent}
                    onChange={setCommentContent}
                    style={{ height: "100px", width: "100%" }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <ButtonCPN
                      type="submit"
                      text="Gửi"
                      primary
                      style={{
                        padding: "0 10px",
                        height: "50px",
                        width: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></ButtonCPN>
                  </div>
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
