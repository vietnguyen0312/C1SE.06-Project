import React, { useEffect, useState } from 'react';
import axios from '../../Configuration/AxiosConfig';
import { Await, Link } from 'react-router-dom';
import styled from 'styled-components';
import ButtonCPN from '../../components/Button/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from '@mui/material';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';

const BlogListContainer = styled.div`
    padding: 20px;
`;

const BlogCard = styled(Link)`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 10px;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0.1, 0, 0.1);
`;

const BlogImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
`;

const BlogTitle = styled.h5`
    flex: 1;
    margin: 0;
`;

const SearchBar = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    width: 300px; /* Set width for the search bar */
`;

const BlogDate = styled.p`
    margin: 0;
    font-size: 12px;
    color: #888; 
`;

const ButtonContainer = styled.div`
    position: fixed;
    top: 120px;
    right: 20px;
    z-index: 1000;
    display: flex;
    justify-content: flex-end; 
    margin-bottom: 20px; 
`;

const CheckboxContainer = styled.div`
    margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
    margin-right: 15px;
`;

const ManageBlog = () => {
    const [blogImages, setBlogImages] = useState([]);
    const [page, setPage] = useState(1);
    const [settedPage, setSettedPage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBlogTypes, setSelectedBlogTypes] = useState([]);
    const [blogTypes, setBlogTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [blogTypesLoaded, setBlogTypesLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const fetchBlogTypes = async () => {
        const response = await axios.get('/blogTypes');
        setBlogTypes(response.result);
        setSelectedBlogTypes(response.result.map(type => type.id)); 
        setBlogTypesLoaded(true);
    };

    const fetchBlogs = async () => {
        if (!blogTypesLoaded) return; 
        setLoading(true);
        const params = {
            page: page,
            size: 6,
            search: searchTerm,
        };

        const response = await axios.get(`/blogs/findByBlogType/${selectedBlogTypes.join(',')}`, { params });

        const newBlogImages = await Promise.all(response.result.data.map(async (blog) => {
            const imageResponse = await axios.get(`/blogImage/findImagesByBlog/${blog.id}`);
            const images = Array.isArray(imageResponse.result)
                ? imageResponse.result.map((image) => image.image)
                : [];
            return {
                ...blog,
                images: images[0] || [],
            };
        }));

        setBlogImages((prevBlogs) => [...prevBlogs, ...newBlogImages]);
        setTotalPages(response.result.totalPages);
        setHasMore(page < response.result.totalPages); 
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogTypes();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => { 
            if (blogTypesLoaded) {
                setPage(1);
                setBlogImages([]);
                fetchBlogs();
            }
        };
        fetchData();
    }, [searchTerm, selectedBlogTypes]);

    useEffect(() => {
            fetchBlogs();
    }, [page]);

    const loadMoreBlogs = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleDeleteBlog = async (id) =>{
        try {
            
           const response = await axios.delete(`/blogs/${id}`);
            await axios.delete(`/upload/deleteImagesWithSubstring?prefix=${id}&folder=Blog`);
            const blogImageResponse = await axios.delete(`/blogImage/${id}`);      
            setBlogImages((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
            toast.success("Xóa thành công!");

       } catch (error) {
           toast.error("Có lỗi xảy ra khi xóa blog!");
       }
    }

    const handleDeleteClick = (id) => {
        setSelectedBlogId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedBlogId) {
            await handleDeleteBlog(selectedBlogId);
            setIsModalOpen(false);
            setSelectedBlogId(null);
        }
    };

    return (
        <BlogListContainer>
            <ButtonContainer>
                <Link style={{textDecoration: "none", color: "inherit", marginRight: "20px"}} to="/manager/createBlog">
                    <ButtonCPN style={{width: "200px", padding: "10px", display: "flex", justifyContent: "center"}} text="Tạo tin mới" />
                </Link>
            </ButtonContainer>
            <SearchBar
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CheckboxContainer>
                {blogTypes.map((type) => (
                    <CheckboxLabel key={type.id}>
                        <input
                            type="checkbox"
                            value={type.id}
                            checked={selectedBlogTypes.includes(type.id)}
                            onChange={(event) => {
                                const { value, checked } = event.target;
                                if (checked) {
                                    setSelectedBlogTypes((prev) => [...prev, value]); 
                                } else {
                                    if (selectedBlogTypes.length === 1) {
                                        return;
                                    }
                                    setSelectedBlogTypes((prev) => prev.filter((id) => id !== value)); 
                                }
                            }}
                        />
                        {type.name}
                    </CheckboxLabel>
                ))}
            </CheckboxContainer>
            <InfiniteScroll
                dataLength={blogImages.length}
                next={loadMoreBlogs}
                hasMore={hasMore}
                loader={<p>Loading more blogs...</p>}
            >
                {blogImages.map((blog) => (
                      <BlogCard key={blog.id}>
                      <Link to={`/manager/editBlog/${blog.id}`} style={{ display: 'flex', flex: 1 , textDecoration: "none", color: "inherit", }}>
                          <BlogImage src={blog.images ? blog.images : '/img/default-image.jpg'} alt={blog.title} />
                          <div style={{ flex: 1 }}>
                              <BlogTitle>{blog.title}</BlogTitle>
                              <BlogDate>{blog.createdDate}</BlogDate>
                          </div>
                      </Link>
                      <ButtonCPN style={{ width: "100px", padding: "10px" }} text="Edit" />
                      <ButtonCPN
                          style={{ width: "100px", padding: "10px", marginLeft: "20px" }}
                          onClick={() => handleDeleteClick(blog.id)}
                          text="Xóa"
                      />
                  </BlogCard>
                  
                ))}
            </InfiniteScroll>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa bài viết này?"
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </BlogListContainer>
    );
};

export default ManageBlog; 