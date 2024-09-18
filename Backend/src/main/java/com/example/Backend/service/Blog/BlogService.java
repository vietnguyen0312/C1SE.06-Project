package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Blog.BlogMapper;
import com.example.Backend.repository.Blog.BlogRepository;
import com.example.Backend.repository.Blog.BlogTypeRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogService {
    BlogRepository blogRepository;
    BlogTypeRepository blogTypeRepository;
    UserRepository userRepository;
    BlogMapper blogMapper;

    public BlogResponse createBlog(BlogCreateRequest request) {
        try {
            Blog blog = blogMapper.toBlog(request);
            blog.setBlogType(blogTypeRepository.findById(request.getBlogTypeId()).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
            blog.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
            return blogMapper.toBlogResponse(blogRepository.save(blog));
        } catch (Exception e) {
            throw new AppException(ErrorCode.EXISTED);
        }
    }

    public BlogResponse updateBlog(BlogUpdateRequest request, String id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        blogMapper.updateBlog(blog, request);
        return blogMapper.toBlogResponse(blogRepository.save(blog));
    }

    public void deleteBlog(String id) {
        blogRepository.deleteById(id);
    }

    public List<BlogResponse> getAllBlog() {
        return blogRepository.findAll().stream().map(blogMapper::toBlogResponse).toList();
    }

    public BlogResponse getBlogById(String id) {
        return blogMapper.toBlogResponse(blogRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public List<BlogResponse> getBlogByBlogType(String idBlogType) {
        return blogRepository.findAllByBlogType(blogTypeRepository.findById(idBlogType)
                .orElseThrow(()->new AppException(ErrorCode.NOT_EXISTED)))
                .stream().map(blogMapper::toBlogResponse).toList();
    }

}
