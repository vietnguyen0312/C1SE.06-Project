package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.service.Blog.BlogService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogController {
    BlogService blogService;

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    ApiResponse<BlogResponse> createBlog(@RequestBody @Valid BlogCreateRequest request) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.createBlog(request))
                .build();
    }

    @GetMapping
    ApiResponse<PageResponse<BlogResponse>> getAllBlogs(
            @RequestParam (value = "page" , required = false, defaultValue = "1") int page,
            @RequestParam (value = "size" , required = false , defaultValue = "6") int size,
            @RequestParam (value = "search", required = false ,defaultValue = "") String search
    ) {
            return ApiResponse.<PageResponse<BlogResponse>>builder()
                    .result(blogService.getAllBlog(page, size ,search))
                    .build()    ;
    }

    @GetMapping("/{id}")
    ApiResponse<BlogResponse> getBlogById(@PathVariable("id") String id) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.getBlogById(id))
                .build();
    }


    @GetMapping("/findByBlogType/{idBlogType}")
    ApiResponse<PageResponse<BlogResponse>> getBlogsByBlogType(@PathVariable("idBlogType") List<String> idBlogType,
        @RequestParam (value = "page" , required = false , defaultValue = "1") int page,
        @RequestParam (value = "size" , required = false , defaultValue = "6") int size,
        @RequestParam (value = "search", required = false ,defaultValue = "") String search
    ) {
        return ApiResponse.<PageResponse<BlogResponse>>builder()
                .result(blogService.getBlogByBlogType( idBlogType, page, size , search))
                .build();
    }
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    ApiResponse<BlogResponse> updateBlog(@PathVariable("id") String id,@RequestBody @Valid BlogUpdateRequest request) {
        return ApiResponse.<BlogResponse>builder()
                .result(blogService.updateBlog(request,id))
                .build();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlog(@PathVariable("id") String id) {
        blogService.deleteBlog(id);
        return ApiResponse.<String>builder()
                .result("Blog has been deleted")
                .build();
    }
}
