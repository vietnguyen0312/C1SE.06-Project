import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons';
import axios from '../Configuration/AxiosConfig';
import { Pagination as MuiPagination } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { format } from 'date-fns';
import { BannerSection2 } from '../Layout/PublicLayout/Home/style';
import styled from 'styled-components';

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

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top:79px;
  
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

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1.5rem;
  padding: 0 10px;
  max-width: 1140px;
  width: 100%;
  margin: 0 auto; 

  @media (max-width: 900px) { 
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (max-width: 600px) { 
    grid-template-columns: 1fr; 
  }
`;

export const BlogCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 400px; // Thêm chiều cao tối thiểu để đảm bảo kích thước nhất quán

  &:hover {
    transform: scale(1.05);
  }
`;

export const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;

  ${BlogCard}:hover & {
    transform: scale(1.1);
    filter: brightness(0.9);
  }
`;

export const BlogContent = styled.div`
  padding: 0.5rem;
`;

export const BlogTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 40px;
`;

export const BlogBody = styled.p`
  color: #666;
  margin-bottom: 0.6rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  background-color: #f5f7fa;
  padding: 5px;
  border-radius: 4px;
  height: 80px;
  font-size: 0.8rem; 
`;

export const BlogInfoDate = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  font-weight: bold;
  background-color: #ebedf0;
  border-radius: 4px;
  display: inline;
  padding: 4px 8px;
  font-size: 0.6rem; 
`;

export const BlogInfoBlogType = styled.div`
    display: flex;
  align-items: left;
  color: #c31414;
  font-weight: bold;
  height: 25px;
  border-radius: 4px;
  background-color: #ebedf0;
  font-size: 0.6rem; 
`;

export const BlogInfoUser = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  font-weight: bold;
  margin-bottom: 20px;
  height: 20px;
  display: inline;
  border-radius: 4px;
  background-color: #ebedf0;
  font-size: 0.6rem; 
`;

export const BlogButton = styled.button`
  width: 100%;
  padding: 5px;
  background-color: #333333;
  color: rgb(209, 245, 100);
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 10px;
`;
export const BlogIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export const SearchBar = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 800px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  button {
    padding: 5px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #5580ae;
    color: white;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d769146d;
    }
  }
`;

export const NavButton = styled.button`
  position: absolute; // Đảm bảo nút được định vị tuyệt đối
  top: 50%;
  transform: translateY(-50%);

  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 1; // Đảm bảo z-index cao hơn ảnh

  // Thay đổi kích thước nút
  width: 40px; // Kích thước nút
  height: 40px; // Kích thước nút
  display: flex; // Sử dụng flex để căn giữa nội dung
  align-items: center; // Căn giữa theo chiều dọc
  justify-content: center; // Căn giữa theo chiều ngang

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1); // Hiệu ứng phóng to khi hover
  }

  &.left {
    left: 10px; // Đặt nút bên trái
  }

  &.right {
    right: 10px; // Đặt nút bên phải
  }
`;
const Body2 = styled.div`
  margin: 0 12%; // Khoảng cách 300px ở hai bên
  padding: 20px; // Thêm padding nếu cần
  background-color: #f5f5f5; // Màu nền tùy chọn
  border-radius: 8px; // Bo góc nếu cần
`;

const AnimatedBlogCard = styled(BlogCard)`
  opacity: 0; 
  transform: translateY(20px); // Start slightly below
  transition: opacity 1s ease, transform 0.5s ease;

  &.visible {
    opacity: 1.5; // Fully visible
    transform: translateY(0); // Move to original position
  }
`;

export class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
      currentPage: 1,
      totalPages: 0,
      pageSize: 6,
      searchTerm: '',
      filteredBlogs: [],
      selectedBlog: null,
      currentImageIndex: {},
      filterByBlogTypeId: props.blogTypeId || null,
      limit: props.limit || null,
      visibleBlogs: [], // Track visible blogs
    };
    this.debounceTimeout = null;
  }
  
  debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  componentDidMount() {
    this.debouncedSearch = this.debounce(this.handleSearch, 500);
    this.getBlogs();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { filteredBlogs } = this.state;
    const visibleBlogs = filteredBlogs.map((_, index) => {
      const element = document.getElementById(`blog-${index}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight; // Check if the element is in view
      }
      return false;
    });
    this.setState({ visibleBlogs });
  };

  getBlogs = async () => {
    const { currentPage, pageSize, searchTerm, filterByBlogTypeId, limit } = this.state;
    this.setState({ loading: true });

    let responseBlogs;
    let blogsWithImages = [];

    // Xây dựng URL API theo các tham số
    const params = {
      page: currentPage,
      size: pageSize,
      search: searchTerm || null,
    };

    // Gọi API theo `blogTypeId` nếu có, nếu không gọi API toàn bộ blogs
    if (filterByBlogTypeId) {
      responseBlogs = await axios.get(`/blogs/findByBlogType/${filterByBlogTypeId}`, { params });
    } else {
      responseBlogs = await axios.get('/blogs', { params });
    }

    if (limit) {
      responseBlogs.result.data = responseBlogs.result.data.slice(0, limit);
    }

    // Lấy hình ảnh cho mỗi blog
    blogsWithImages = await Promise.all(
      responseBlogs.result.data.map(async (blog) => {
        const imageResponse = await axios.get(`/images/findImagesByBlog/${blog.id}`);
        const images = Array.isArray(imageResponse.result)
          ? imageResponse.result.map((image) => image.image)
          : [];
        return {
          ...blog,
          images: images || [], // Đảm bảo `images` luôn là một mảng
        };
      })
    );

    // Cập nhật state
    this.setState({
      blogs: blogsWithImages,
      filteredBlogs: blogsWithImages,
      loading: false,
      totalPages: responseBlogs.result.totalPages,
      totalElements: responseBlogs.result.totalElements,
    });
  };

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
    this.debouncedSearch(); 
  };

  handleSearch = () => {
    // Gọi lại API để tìm kiếm
    this.setState({ currentPage: 1 }, this.getBlogs);
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber, loading: true }, this.getBlogs);
  };

  handleImageChange = (blogId, direction) => {
    this.setState((prevState) => {
      const currentIndex = prevState.currentImageIndex[blogId] || 0;
      const blog = prevState.blogs.find((b) => b.id === blogId);
      
      if (!blog || !blog.images || blog.images.length === 0) {
        return prevState; 
      }
  
      const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + blog.images.length) % blog.images.length;
  
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [blogId]: newIndex,
        },
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.blogTypeId !== this.props.blogTypeId) {
      this.setState({ filterByBlogTypeId: this.props.blogTypeId }, this.getBlogs);
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.getBlogs();
    }
  }

  render() {
    const { loading, filteredBlogs, currentImageIndex, searchTerm, visibleBlogs, currentPage, totalPages } = this.state;
    const blogTypeId = this.state.filterByBlogTypeId;


    return (
      <div>
        <BannerSection2>
          <Overlay />
          <Container>
            <Row>
              <AboutContent>
                <Title1>Tin Tức</Title1>
                <LinkNav>
                  {/* <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink> */}
                  <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                  {/* <StyledLink to="/about" data-aos="fade-left" data-aos-delay="0">About Us</StyledLink> */}
                </LinkNav>
              </AboutContent>
            </Row>
          </Container>
        </BannerSection2>

        <Body2>
          <Title>Thông Tin Văn Hóa - Ẩm Thực</Title>

          <SearchBar>
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleInputChange}
              placeholder="Nhập tại đây"
            />
            <button style={{backgroundColor: "#333333", color: "white"}} onClick={this.handleSearch}>Tìm kiếm</button>
          </SearchBar>

          {loading ? (
            <LoadingIcons.SpinningCircles />
          ) : (
            <Grid>
              {filteredBlogs.map((post, index) => (
                <AnimatedBlogCard
                  key={post.id}
                  id={`blog-${index}`}
                  className={visibleBlogs[index] ? 'visible' : ''} // Add class based on visibility
                >
                  {post.images && post.images.length > 0 && (
                    <div style={{ position: 'relative' }}>
                      <BlogImage
                        src={`/img/blog/${post.images[currentImageIndex[post.id] || 0]}`}
                        alt={post.title}
                      />
                      <NavButton className="left" onClick={() => this.handleImageChange(post.id, 'prev')}>
                        &lt;
                      </NavButton>
                      <NavButton className="right" onClick={() => this.handleImageChange(post.id, 'next')}>
                        &gt;
                      </NavButton>
                    </div>
                  )}
                  <BlogContent>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogBody>{post.contentOpen}</BlogBody>
                    <BlogInfoDate>
                      <BlogIcon src="/img/time.png" alt="Blog Type Icon" />
                      <span>{post.createdDate}</span>
                    </BlogInfoDate>
                    <BlogInfoBlogType>
                      <BlogIcon src="/img/tag.png" alt="Blog Type Icon" />
                      <span>{post.blogType?.name}</span>
                    </BlogInfoBlogType>
                    <BlogInfoUser>
                      <BlogIcon src="/img/user.png" alt="User Icon" />
                      <span>{post.user?.username}</span>
                    </BlogInfoUser>
                  </BlogContent>
                  <BlogButton>
                <Link to={`/blogDetail/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  Xem chi tiết...
                </Link>
              </BlogButton>
                </AnimatedBlogCard>
              ))}
            </Grid>
          )}
        </Body2>

        {this.state.totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <MuiPagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              size="large"
              showFirstButton
              showLastButton
              onChange={(event, page) => {
                this.paginate(page); 
              }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
        )}
      </div>
    );
  }
}



export default BlogList;
