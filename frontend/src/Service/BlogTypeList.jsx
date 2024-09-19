import React, { Component } from 'react';
import LoadingIcons from 'react-loading-icons'
import axios from '../Configuration/AxiosConfig'; // Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn

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
        try {
            const response = await axios.get('/blogTypes');
            this.setState({ blogTypes: response.result, loading: false });
        } catch (error) {
            console.error('Error fetching blog types:', error);
            this.setState({ loading: false, error: 'Failed to load blog types' });
        }
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
                    <li key={blogType.id}><a href={`/blogs?blogTypeId=${blogType.id}`}>{blogType.name}</a></li>
                ))}
            </>
        );
    }
}

export default BlogTypeList;
