package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCommentCreateRequest;
import com.example.Backend.dto.request.Blog.BlogCommentUpdateRequest;
import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogCommentResponse;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogComment;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;

import com.example.Backend.mapper.Blog.BlogCommentMapper;

import com.example.Backend.repository.Blog.BlogCommentRepository;

import com.example.Backend.repository.Blog.BlogRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogCommentService {
    BlogCommentRepository blogCommentRepository;
    BlogCommentMapper blogCommentMapper;
    BlogRepository blogRepository;
    UserRepository userRepository;

    public BlogCommentResponse createBlogComment(BlogCommentCreateRequest request) {
        BlogComment blogComment = blogCommentMapper.toBlogComment(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));


        blogComment.setUser(user);
        blogComment.setBlog(blog);
        blogComment.setDateUpdate(new Date());
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }

    public BlogCommentResponse updateBlogComment(BlogCommentUpdateRequest request, String id) {
        BlogComment blogComment = blogCommentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        blogCommentMapper.updateBlogComment(blogComment, request);
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }

    public void deleteBlogComment(String id) {
        blogCommentRepository.deleteById(id);
    }

    public BlogCommentResponse getBlogComment(String id) {
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public List<BlogCommentResponse> getBlogCommentByIdBlog(String idBlog) {
        return blogCommentRepository.findAllByBlog(blogRepository.findById(idBlog)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)))
                .stream().map(blogCommentMapper::toBlogCommentResponse).toList();
    }

    public List<BlogCommentResponse> getBlogCommentByUserId(String userId) {
        // Tìm User từ ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        // Tìm tất cả các BlogComment của  User
        return blogCommentRepository.findAllByUser(user)
                .stream().map(blogCommentMapper::toBlogCommentResponse)
                .toList();
    }
}
