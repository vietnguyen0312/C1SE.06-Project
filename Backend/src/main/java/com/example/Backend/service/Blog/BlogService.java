package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.dto.response.PageResponse;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.data.domain.Sort;

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

    public PageResponse<BlogResponse> getAllBlog(int page , int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateTimeEdit").descending();

        Pageable pageable = PageRequest.of(page-1, size, sort);
        var pageData = blogRepository.findAll(pageable);

        return PageResponse.<BlogResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(blogMapper::toBlogResponse).toList())
                .build();
    }

    public BlogResponse getBlogById(String id) {
        return blogMapper.toBlogResponse(blogRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public PageResponse<BlogResponse> getBlogByBlogType(String idBlogType, int page , int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateTimeEdit").descending();
        Pageable pageable = PageRequest.of(page-1, size, sort);
        var pageData = blogRepository.findAllByBlogType( blogTypeRepository.findById(idBlogType)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)), pageable);

        return PageResponse.<BlogResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(blogMapper::toBlogResponse).toList())
                .build();
    }

}
