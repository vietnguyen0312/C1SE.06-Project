package com.example.Backend.mapper.Blog;

import com.example.Backend.dto.request.Blog.BlogImagesCreateRequest;
import com.example.Backend.dto.response.Blog.BlogImagesResponse;
import com.example.Backend.entity.Blog.BlogImages;

import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface BlogImagesMapper{
    BlogImages toBlogImages (BlogImagesCreateRequest request);
    BlogImagesResponse toBlogImagesResponse (BlogImages blogImages);
}
