package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCommentCreateRequest;
import com.example.Backend.dto.request.Blog.BlogCommentUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogCommentResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogComment;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;

import com.example.Backend.mapper.Blog.BlogCommentMapper;

import com.example.Backend.repository.Blog.BlogCommentRepository;

import com.example.Backend.repository.Blog.BlogRepository;
import com.example.Backend.repository.User.UserRepository;
import com.example.Backend.service.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogCommentService {
    DateTimeFormatter dateTimeFormatter;
    BlogCommentRepository blogCommentRepository;
    BlogCommentMapper blogCommentMapper;
    BlogRepository blogRepository;
    UserRepository userRepository;
    @PreAuthorize("isAuthenticated()")
    public BlogCommentResponse createBlogComment(BlogCommentCreateRequest request) {
        BlogComment blogComment = blogCommentMapper.toBlogComment(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        blogComment.setUser(user);
        blogComment.setBlog(blog);
        blogComment.setDateUpdate(Instant.now());
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }

    @PostAuthorize("isAuthenticated()")
    public BlogCommentResponse updateBlogComment(BlogCommentUpdateRequest request, String id) {
        BlogComment blogComment = blogCommentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        blogCommentMapper.updateBlogComment(blogComment, request);
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }
    @PreAuthorize("isAuthenticated()")
    public void deleteBlogComment(String id) {
        blogCommentRepository.deleteById(id);
    }

    public BlogCommentResponse getBlogComment(String id) {
        return blogCommentMapper.toBlogCommentResponse(
                blogCommentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public PageResponse<BlogCommentResponse> getBlogCommentByIdBlog(String idBlog, int page, int size) {
        Sort sort= Sort.by(Sort.Direction.DESC, "dateUpdate");
        Pageable pageable = PageRequest.of(page-1, size, sort);
        var pageData = blogCommentRepository.findAllByBlog(blogRepository.findById(idBlog).orElseThrow(
                ()-> new AppException(ErrorCode.NOT_EXISTED)),pageable);
        var listData = pageData.getContent().stream().map(blogComment -> {
            var blogCommentResponse = blogCommentMapper.toBlogCommentResponse(blogComment);
            blogCommentResponse.setCreatedDate(dateTimeFormatter.format(blogComment.getDateUpdate()));
            return blogCommentResponse;
        }).toList();
       return PageResponse.<BlogCommentResponse>builder()
               .currentPage(page)
               .totalPages(pageData.getTotalPages())
               .pageSize(size)
               .totalElements(pageData.getTotalElements())
               .data(listData)
               .build();

    }

    public PageResponse<BlogCommentResponse> getBlogCommentByUserId(String userId, int page, int size) {
        Sort sort= Sort.by(Sort.Direction.DESC, "dateUpdate");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        Pageable pageable = PageRequest.of(page-1, size, sort);
        var pageData = blogCommentRepository.findAllByUser(user, pageable);
        var listData = pageData.getContent().stream().map(blogComment -> {
            var blogCommentResponse = blogCommentMapper.toBlogCommentResponse(blogComment);
            blogCommentResponse.setCreatedDate(dateTimeFormatter.format(blogComment.getDateUpdate()));
            return blogCommentResponse;
        }).toList();
        return PageResponse.<BlogCommentResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(listData)
                .build();
    }



}
