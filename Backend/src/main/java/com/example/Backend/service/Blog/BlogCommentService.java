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
import com.example.Backend.components.DateTimeFormatter;
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


    public BlogCommentResponse createBlogComment(BlogCommentCreateRequest request) {
        BlogComment blogComment = blogCommentMapper.toBlogComment(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        System.out.println("lỗi trong này");
        blogComment.setUser(user);
        blogComment.setBlog(blog);
        blogComment.setDateUpdate(Instant.now());
        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }

    @PostAuthorize("returnObject.user.email == authentication.name")
    public BlogCommentResponse updateBlogComment( BlogCommentUpdateRequest request, String id) {
        BlogComment blogComment = blogCommentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        blogComment.setDateUpdate(Instant.now());
        blogCommentMapper.updateBlogComment(blogComment, request);

        return blogCommentMapper.toBlogCommentResponse(blogCommentRepository.save(blogComment));
    }

    @PreAuthorize("#email == authentication.name or hasRole('MANAGER')" )
    public void deleteBlogComment(String id, String email) {
        blogCommentRepository.deleteById(id);
    }

    public BlogCommentResponse getBlogComment(String id) {
        return blogCommentMapper.toBlogCommentResponse(
                blogCommentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public PageResponse<BlogCommentResponse> getBlogComments(Pageable pageable, User user, String idBlog) {
        var pageData = (user != null)
                ? blogCommentRepository.findAllByUser(user, pageable)
                : blogCommentRepository.findAllByBlog(blogRepository.findById(idBlog)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)), pageable);

        var listData = pageData.getContent().stream().map(blogComment -> {
            var blogCommentResponse = blogCommentMapper.toBlogCommentResponse(blogComment);
            blogCommentResponse.setCreatedDate(dateTimeFormatter.format(blogComment.getDateUpdate()));
            return blogCommentResponse;
        }).toList();

        return PageResponse.<BlogCommentResponse>builder()
                .currentPage(pageable.getPageNumber() + 1)
                .totalPages(pageData.getTotalPages())
                .pageSize(pageable.getPageSize())
                .totalElements(pageData.getTotalElements())
                .data(listData)
                .build();
    }

    public BlogCommentResponse getBlogCommentByIdComment(String idComment) {
        BlogComment blogComment = blogCommentRepository.findById(idComment)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        return blogCommentMapper.toBlogCommentResponse(blogComment);
    }

    public PageResponse<BlogCommentResponse> getBlogCommentByIdBlog(String idBlog, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateUpdate");

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        return getBlogComments(pageable, null, idBlog);
    }

    public PageResponse<BlogCommentResponse> getBlogCommentByUserId(String userId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateUpdate");

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        return getBlogComments(pageable, user, null);
    }




}
