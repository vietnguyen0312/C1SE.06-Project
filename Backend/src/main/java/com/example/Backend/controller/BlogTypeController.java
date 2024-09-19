package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogTypeCreateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.dto.response.Blog.BlogTypeResponse;
import com.example.Backend.mapper.Blog.BlogTypeMapper;
import com.example.Backend.repository.Blog.BlogTypeRepository;
import com.example.Backend.service.Blog.BlogTypeService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/blogTypes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogTypeController {
    private final BlogTypeMapper blogTypeMapper;
    BlogTypeService blogTypeService;


    @PostMapping
    ApiResponse<BlogTypeResponse> createBlogType(@RequestBody @Valid BlogTypeCreateRequest request) {
        return ApiResponse.<BlogTypeResponse>builder()
                .result(blogTypeService.createBlogType(request))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BlogTypeResponse> getBlogTypeById(@PathVariable String id) {
        return ApiResponse.<BlogTypeResponse>builder()
                .result(blogTypeService.getBlogTypeById(id))
                .build();
    }

    @GetMapping
    ApiResponse<List<BlogTypeResponse>> getAllBlogType() {
        return ApiResponse.<List<BlogTypeResponse>>builder()
                .result(blogTypeService.getAllBlogTypes())
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlogTypeById(@PathVariable("id") String id) {
        blogTypeService.deleteBlogType(id);
        return ApiResponse.<String>builder()
                .result("Blog type has been delete")
                .build();

    }




}
