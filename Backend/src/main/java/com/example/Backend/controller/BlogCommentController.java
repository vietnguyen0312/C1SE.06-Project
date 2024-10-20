package com.example.Backend.controller;

import com.example.Backend.dto.request.Blog.BlogCommentCreateRequest;
import com.example.Backend.dto.request.Blog.BlogCommentUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Blog.BlogCommentResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.service.Blog.BlogCommentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.example.Backend.dto.response.Blog.CommentMessageResponse;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/blogComments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogCommentController {
    BlogCommentService blogCommentService;
    SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping
    ApiResponse<BlogCommentResponse> createBlogComment(@RequestBody @Valid BlogCommentCreateRequest request) {
        BlogCommentResponse response = blogCommentService.createBlogComment(request);

        simpMessagingTemplate.convertAndSend("/topic/comments",
                new CommentMessageResponse("CREATE", response));

        return ApiResponse.<BlogCommentResponse>builder()
                .result(response)
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<BlogCommentResponse> updateBlogComment(@PathVariable("id") String id,
                                                       @RequestBody @Valid BlogCommentUpdateRequest request) {
        BlogCommentResponse response = blogCommentService.updateBlogComment(request, id);

        simpMessagingTemplate.convertAndSend("/topic/comments",
                new CommentMessageResponse("UPDATE", response));
        return ApiResponse.<BlogCommentResponse>builder()
                .result(response)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BlogCommentResponse> getBlogCommentById(@PathVariable("id")String id) {
        return ApiResponse.<BlogCommentResponse>builder()
                .result(blogCommentService.getBlogComment(id))
                .build();
    }

    @GetMapping("/byBlog/{idBlog}")
    ApiResponse<PageResponse<BlogCommentResponse>> getBlogCommentsByBlogId(
            @RequestParam(value = "page" , required = false, defaultValue = "1") int page,
            @RequestParam(value = "size" , required = false, defaultValue = "6") int size,
            @PathVariable String idBlog) {
        return ApiResponse.<PageResponse<BlogCommentResponse>>builder()
                .result(blogCommentService.getBlogCommentByIdBlog(idBlog,page, size))
                .build();
    }

    @GetMapping("/byUser/{userId}")
    ApiResponse<PageResponse<BlogCommentResponse>> getBlogCommentsByUserId(
            @RequestParam(value = "page" , required = false,defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size,
            @PathVariable String userId) {
        return ApiResponse.<PageResponse<BlogCommentResponse>>builder()
                .result(blogCommentService.getBlogCommentByUserId(userId, page, size ))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBlogComment(@PathVariable("id") String id) {
        BlogCommentResponse blogCommentResponse = blogCommentService.getBlogCommentByIdComment(id);
        blogCommentService.deleteBlogComment(id, blogCommentResponse.getUser().getEmail());

        simpMessagingTemplate.convertAndSend("/topic/comments",
                new CommentMessageResponse("DELETE", blogCommentResponse));

        return ApiResponse.<String>builder()
                .result("Blog comment has been deleted")
                .build();
    }
}
