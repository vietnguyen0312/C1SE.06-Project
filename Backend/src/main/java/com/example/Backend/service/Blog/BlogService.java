package com.example.Backend.service.Blog;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.Backend.components.DateTimeFormatter;
import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.mapper.Blog.BlogMapper;
import com.example.Backend.repository.Blog.BlogRepository;
import com.example.Backend.repository.Blog.BlogTypeRepository;
import com.example.Backend.repository.User.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogService {
    DateTimeFormatter dateTimeFormatter;
    BlogRepository blogRepository;
    BlogTypeRepository blogTypeRepository;
    UserRepository userRepository;
    BlogMapper blogMapper;

    private BlogResponse formatBlogResponse(Blog blog) {
        BlogResponse blogResponse = blogMapper.toBlogResponse(blog);
        blogResponse.setCreatedDate(dateTimeFormatter.format(blog.getDateTimeEdit()));
        return blogResponse;
    }

    private PageResponse<BlogResponse> createPageResponse(Page<Blog> pageData, int currentPage, int pageSize) {
        var listData = pageData.getContent().stream()
                .map(this::formatBlogResponse)
                .toList();

        return PageResponse.<BlogResponse>builder()
                .currentPage(currentPage)
                .totalPages(pageData.getTotalPages())
                .pageSize(pageSize)
                .totalElements(pageData.getTotalElements())
                .data(listData)
                .build();
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER')")
    public BlogResponse createBlog(BlogCreateRequest request) {
        Blog blog = blogMapper.toBlog(request);

        blog.setDateTimeEdit(Instant.now());

        blog.setBlogType(blogTypeRepository.findById(request.getBlogTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));

        blog.setUser(userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));

        return blogMapper.toBlogResponse(blogRepository.save(blog));
    }

    @PostAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER')")
    public BlogResponse updateBlog(BlogUpdateRequest request, String id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        blog.setDateTimeEdit(Instant.now());

        blogMapper.updateBlog(blog, request);

        return blogMapper.toBlogResponse(blogRepository.save(blog));
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER')")
    public void deleteBlog(String id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        blogRepository.delete(blog);
    }

    public PageResponse<BlogResponse> getAllBlog(int page, int size, String search) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateTimeEdit").descending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<Blog> pageData;

        if (StringUtils.hasLength(search)) {
            pageData = blogRepository.findByTitleOrBodyOrContentOpenContaining(search, search, search, pageable);
        } else {
            pageData = blogRepository.findAll(pageable);
        }

        return createPageResponse(pageData, page, size);
    }

    public BlogResponse getBlogById(String id) {

        return formatBlogResponse(blogRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public PageResponse<BlogResponse> getBlogByBlogType(List<String> idBlogType, int page, int size, String search) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateTimeEdit").descending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<Blog> pageData;

        if (StringUtils.hasLength(search)) {
            pageData = blogRepository.findByBlogTypeInAndTitleOrBodyOrContentOpenContaining(
                    blogTypeRepository.findAllById(idBlogType), search, search, search, pageable);
        } else {
            pageData = blogRepository.findByBlogTypeIn(blogTypeRepository.findAllById(idBlogType), pageable);
        }
        return createPageResponse(pageData, page, size);
    }

}
