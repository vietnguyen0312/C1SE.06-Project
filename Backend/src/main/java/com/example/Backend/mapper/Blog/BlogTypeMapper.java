package com.example.Backend.mapper.Blog;

import com.example.Backend.dto.request.Blog.BlogTypeCreateRequest;
import com.example.Backend.dto.request.Blog.BlogTypeUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogTypeResponse;
import com.example.Backend.entity.Blog.BlogType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BlogTypeMapper {


    BlogType toBlogType(BlogTypeCreateRequest request);


    void updateBlogType(@MappingTarget BlogType blogType, BlogTypeUpdateRequest request);

    BlogTypeResponse toBlogTypeResponse(BlogType blogType);
}
