import React, { Component } from 'react'
import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import '../Style/Blog.css'
import '../Style/Loading.css'
import axios from './axios-customize'
import Pagination from '../components/Pagination'

export class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            loading: true,
            currentPage: 1,
            blogsPerPage: 6,
            selectedBlog: null,
            isModalOpen: false,
            filterByBlogTypeId: props.blogTypeId || null,
            limit: props.limit || null
        }
    }

    getBlogs = async () => {
        try {
            let responseBlogs;
            let blogsWithImages = [];
    
            // Gọi API để lấy danh sách blog
            if (this.state.filterByBlogTypeId === null) {
                responseBlogs = await axios.get('/blogs');
                if (this.state.limit) {
                    responseBlogs.result = responseBlogs.result.slice(0, this.state.limit);
                }
            } else {
                responseBlogs = await axios.get(`/blogs/findByBlogType/${this.state.filterByBlogTypeId}`);
            }
    
            // Duyệt qua từng blog và lấy hình ảnh tương ứng
            for (const blog of responseBlogs.result) {
                const imageResponse = await axios.get(`/images/findImagesByBlog/${blog.id}`);
                // Thêm danh sách hình ảnh vào blog
                blogsWithImages.push({
                    ...blog,
                    images: imageResponse.result.map(image => image.image) // Chỉ lấy danh sách tên ảnh
                });
            }
    
            // Cập nhật state với blogs có hình ảnh
            this.setState({ blogs: blogsWithImages, loading: false });
        } catch (error) {
            console.error('Error fetching blogs or images:', error.response || error);
            this.setState({ loading: false, blogs: [] });
        }
    };
    

    componentDidMount = () => {
        this.getBlogs()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.blogTypeId !== this.props.blogTypeId) {
            this.setState({ filterByBlogTypeId: this.props.blogTypeId }, this.getBlogs);
        }
    }

    setSelectedBlog = (blog) => {
        this.setState({ selectedBlog: blog, isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    render() {
        const { currentPage, blogsPerPage, blogs, loading } = this.state;
        const indexOfLastBlog = currentPage * blogsPerPage;
        const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
        const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

        const totalPages = Math.ceil(blogs.length / blogsPerPage);

        return (
            <>
                <div className='row'>
                    {loading && (
                        <div className="loading-container">
                            <LoadingIcons.TailSpin stroke="#000" />
                        </div>
                    )}
                    {currentBlogs.map(blog => (
                        <div className="col-md-4 ftco-animate container" key={blog.id}>
                            <div className="project-wrap">
                                {/* Hiển thị hình ảnh blog */}
                                <a className="img" style={{ backgroundImage: `url(/img/blog/${blog.images[0]})` }}></a>
                                <div className="text p-4">
                                    <h3>
                                        <button
                                            className="blog-button"
                                            onClick={() => this.setSelectedBlog(blog)}
                                        >
                                            {blog.title}
                                        </button>
                                    </h3>
                                    <p className="location">
                                        <span className="fa fa-map-marker"></span>
                                        {blog.body}
                                    </p>
                                    <ul>
                                        <li>
                                            <span className="flaticon-mountains"></span>
                                            <a>{blog.blogType.name}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}


                    {this.state.isModalOpen && this.state.selectedBlog && (
                        <div className="modal-backdrop fade show" onClick={this.closeModal}>
                            <div
                                className={`modal custom-modal fade ${this.state.isModalOpen ? 'show' : ''}`}
                                onClick={e => e.stopPropagation()}
                                style={{ display: 'block' }}
                            >
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3>{this.state.selectedBlog.blogType.name}</h3>
                                            <button
                                                type="button"
                                                className="close"
                                                onClick={this.closeModal}
                                                aria-label="Close"
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <h3
                                                    style={{ color: 'black', cursor: 'pointer' }}
                                                    onMouseOver={(e) => e.target.style.color = 'orange'}
                                                    onMouseOut={(e) => e.target.style.color = 'black' }
                                                >
                                                    {this.state.selectedBlog.title}
                                                </h3>
                                            </div>
                                            <div className="mb-3 text-center">
                                                {/* Hiển thị hình ảnh của blog */}
                                                <img
                                                    src={`/img/blog/${this.state.selectedBlog.image}`}
                                                    alt="Blog Image"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div>
                                                <p><strong>Description:</strong></p>
                                                <p>{this.state.selectedBlog.body}</p>
                                                <p><strong>Additional Info:</strong></p>
                                                <p>{this.state.selectedBlog.contentOpen}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Hiển thị phân trang nếu có nhiều trang */}
                {totalPages > 1 && (
                    <Pagination
                        itemsPerPage={blogsPerPage}
                        totalItems={blogs.length}
                        paginate={this.paginate}
                        currentPage={currentPage}
                    />
                )}
            </>
        )
    }
}

export default BlogList
