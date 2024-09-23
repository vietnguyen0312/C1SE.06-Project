import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons';
import axios from '../Configuration/AxiosConfig';
import '../Style/BlogDetail.css';

export class BlogForDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null,
            loading: true,
            error: null,
        };
    }

    getBlog = async () => {
        const { blogId } = this.props.match.params;
        try {
            const response = await axios.get(`/blogs/${blogId}`);
            this.setState({ blog: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching blog:', error);
            this.setState({ error: 'Failed to load blog detail', loading: false });
        }
    };

    componentDidMount = () => {
        this.getBlog();
    };

    render() {
        const { blog, loading, error } = this.state;
       
        return (
            <div className="blog-detail-container">
              
              {blog.title && <h1 className="blog-title">{blog.title}</h1>}
              {(blog.dateTimeEdit || blog.blogType?.name || blog.user?.username) && (
                <div className="blog-info">
                  {blog.dateTimeEdit && <span>{new Date(blog.dateTimeEdit).toLocaleString()}</span>}
                  {blog.blogType?.name && <span>{blog.blogType.name}</span>}
                  {blog.user?.username && <span>{blog.user.username}</span>}
                </div>
              )}
              {blog.images && blog.images.length > 0 && (
                <div className="blog-images">
                  {blog.images.map((image, index) => (
                    <img key={index} src={`/img/blog/${image}`} alt={`Blog Image ${index + 1}`} />
                  ))}
                </div>
              )}
              {(blog.contentOpen || blog.content) && (
                <div className="blog-content">
                  {blog.contentOpen && <p>{blog.contentOpen}</p>}
                  {blog.content && <p>{blog.content}</p>}
                </div>
              )}
            </div>
          );
          
    }
}

export default BlogForDetail;