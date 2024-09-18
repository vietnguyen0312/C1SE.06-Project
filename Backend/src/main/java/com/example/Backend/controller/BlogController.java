package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.service.Blog.BlogService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogController {
    BlogService blogService;

    @PostMapping
    ApiResponse<BlogResponse> createBlog(@RequestBody @Valid BlogCreateRequest request) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.createBlog(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<BlogResponse>> getAllBlogs() {
        return ApiResponse.<List<BlogResponse>>builder()
                .result(blogService.getAllBlog())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BlogResponse> getBlogById(@PathVariable("id") String id) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.getBlogById(id))
                .build();
    }

    @GetMapping("/findByBlogType/{idBlogType}")
    ApiResponse<List<BlogResponse>> getBlogsByBlogType(@PathVariable("idBlogType") String idBlogType) {
        return ApiResponse.<List<BlogResponse>>builder()
                .result(blogService.getBlogByBlogType(idBlogType))
                .build();
    }
    @PutMapping("/{id}")
    ApiResponse<BlogResponse> updateBlog(@PathVariable("id") String id,@RequestBody @Valid BlogUpdateRequest request) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.updateBlog(request,id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlog(@PathVariable("id") String id) {
        blogService.deleteBlog(id);
        return ApiResponse.<String>builder()
                .result("Blog has been deleted")
                .build();
    }
}
