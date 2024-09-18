package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogCommentCreateRequest;
import com.example.Backend.dto.request.Blog.BlogCommentUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogCommentResponse;
import com.example.Backend.service.Blog.BlogCommentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogComments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogCommentController {
    BlogCommentService blogCommentService;

    @PostMapping
    ApiResponse<BlogCommentResponse> createBlogComment(@RequestBody @Valid BlogCommentCreateRequest request) {
        return ApiResponse.<BlogCommentResponse>builder()
                .result(blogCommentService.createBlogComment(request))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<BlogCommentResponse> updateBlogComment(@PathVariable String id, @RequestBody @Valid BlogCommentUpdateRequest request) {
        return ApiResponse.<BlogCommentResponse>builder()
                .result(blogCommentService.updateBlogComment(request, id))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BlogCommentResponse> getBlogCommentById(@PathVariable String id) {
        return ApiResponse.<BlogCommentResponse>builder()
                .result(blogCommentService.getBlogComment(id))
                .build();
    }

    @GetMapping("/byBlog/{idBlog}")
    ApiResponse<List<BlogCommentResponse>> getBlogCommentsByBlogId(@PathVariable String idBlog) {
        return ApiResponse.<List<BlogCommentResponse>>builder()
                .result(blogCommentService.getBlogCommentByIdBlog(idBlog))
                .build();
    }

    @GetMapping("/byUser/{userId}")
    ApiResponse<List<BlogCommentResponse>> getBlogCommentsByUserId(@PathVariable String userId) {
        return ApiResponse.<List<BlogCommentResponse>>builder()
                .result(blogCommentService.getBlogCommentByUserId(userId))
                .build();
    }


    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlogComment(@PathVariable String id) {
        blogCommentService.deleteBlogComment(id);
        return ApiResponse.<String>builder()
                .result("Blog has been deleted")
                .build();
    }
}
