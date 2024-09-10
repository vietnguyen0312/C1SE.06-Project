package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogTypeCreateRequest;
import com.example.Backend.dto.request.Blog.BlogTypeUpdateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.dto.response.Blog.BlogTypeResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Blog.BlogTypeMapper;
import com.example.Backend.repository.Blog.BlogTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogTypeService {
    BlogTypeRepository blogTypeRepository;
    BlogTypeMapper  blogTypeMapper;

    public BlogTypeResponse createBlogType (BlogTypeCreateRequest  request) {
        BlogType blogType = blogTypeMapper.toBlogType(request);
        return blogTypeMapper.toBlogTypeResponse(blogTypeRepository.save(blogType));
    }

    public BlogTypeResponse updateBlogType (BlogTypeUpdateRequest request, String id){
        BlogType blogType = blogTypeRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));
        blogTypeMapper.updateBlogType(blogType,request);
        return blogTypeMapper.toBlogTypeResponse(blogTypeRepository.save(blogType));
    }
    public void deleteBlogType (String id){
        blogTypeRepository.deleteById(id);
    }
    public BlogTypeResponse getBlogType (String id){
        return blogTypeMapper.toBlogTypeResponse(blogTypeRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));
    }

}
