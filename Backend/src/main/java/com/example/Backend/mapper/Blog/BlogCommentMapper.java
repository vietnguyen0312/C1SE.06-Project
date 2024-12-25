package com.example.Backend.mapper.Blog;

import com.example.Backend.dto.request.Blog.BlogCommentCreateRequest;
import com.example.Backend.dto.request.Blog.BlogCommentUpdateRequest;

import com.example.Backend.dto.response.Blog.BlogCommentResponse;
import com.example.Backend.entity.Blog.BlogComment;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BlogCommentMapper {
    BlogComment toBlogComment(BlogCommentCreateRequest request);

    void updateBlogComment(@MappingTarget BlogComment blogComment, BlogCommentUpdateRequest request);

    BlogCommentResponse toBlogCommentResponse(BlogComment blogComment);
}
