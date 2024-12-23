package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogImagesCreateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogImagesResponse;
import com.example.Backend.service.CloudinaryService;
import com.example.Backend.service.Blog.BlogImagesService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blogimage")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogImageController {
    BlogImagesService blogImagesService;


    @GetMapping("/findImagesByBlog/{id}")
    ApiResponse<List<BlogImagesResponse>> findImagesByBlog(@PathVariable("id") String idBlog) {
        return ApiResponse.<List<BlogImagesResponse>>builder()
                .result(blogImagesService.getBlogImagesByBlog(idBlog))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BlogImagesResponse> findImageById(@PathVariable("id") String idBlog) {
        return ApiResponse.<BlogImagesResponse>builder()
                .result(blogImagesService.getBlogImagesById(idBlog))
                .build();
    }

    @PostMapping
    ApiResponse<BlogImagesResponse> createBlogImage(@RequestBody @Valid BlogImagesCreateRequest request) {
        return ApiResponse.<BlogImagesResponse>builder()
                .result(blogImagesService.createBlogImages(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlogImage(@PathVariable("id") String idImage) {
        blogImagesService.deleteBlogImages(idImage);
        return ApiResponse.<String>builder()
                .result("Images has been deleted")
                .build();
    }

}
