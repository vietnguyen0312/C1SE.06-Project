package com.example.Backend.mapper.Blog;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.entity.Blog.Blog;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    Blog toBlog (BlogCreateRequest request);
    void updateBlog (@MappingTarget Blog blog, BlogUpdateRequest request);
    BlogResponse toBlogResponse(Blog blog);
}
