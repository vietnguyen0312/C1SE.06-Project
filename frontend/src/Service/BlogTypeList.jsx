import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons'
import axios from '../Configuration/AxiosConfig'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavMenuLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: block;

  &:hover {
    color: #f8b600;
    
  }
`;

class BlogTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTypes: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchBlogTypes();
    }

    fetchBlogTypes = async () => {
            const response = await axios.get('/blogTypes');
            this.setState({ blogTypes: response.result, loading: false });
    };

    render() {
        const { blogTypes, loading } = this.state;

        return (
            <>
                {loading && (
                    <div className="loading-container">
                        <LoadingIcons.TailSpin stroke="#000" />
                    </div>
                )}
                {blogTypes.map(blogType => (
                    <li key={blogType.id}>
             
                        <Link style={{ color: 'black' }} className="dropdown-item" to={`/blogs?blogTypeId=${blogType.id}`}>
                           {blogType.name}
                        </Link>
                    </li>
                ))}
            </>
        );
    }
}

export default BlogTypeList;