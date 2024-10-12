package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogImagesCreateRequest;
import com.example.Backend.dto.response.Blog.BlogImagesResponse;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogImages;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.exception.GlobalExceptionHandler;
import com.example.Backend.mapper.Blog.BlogImagesMapper;
import com.example.Backend.repository.Blog.BlogRepository;
import com.example.Backend.repository.Blog.BlogImagesRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BlogImagesService {
    BlogImagesRepository blogImagesRepository;
    BlogRepository blogRepository;
    BlogImagesMapper blogImagesMapper;

    public BlogImagesResponse createBlogImages(BlogImagesCreateRequest request) {
           BlogImages blogImages = blogImagesMapper.toBlogImages(request);

           if(blogImagesRepository.existsByImage(blogImages.getImage())) {
               throw new AppException(ErrorCode.EXISTED);
           }

           return blogImagesMapper.toBlogImagesResponse(blogImagesRepository.save(blogImages));
    }

    public List<BlogImagesResponse> getBlogImagesByBlog(String blogId) {
        return blogImagesRepository.findAllByBlog(
                        blogRepository.findById(blogId)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED))
                ).stream()
                .map(blogImagesMapper::toBlogImagesResponse)
                .toList();
    }

    public BlogImagesResponse getBlogImagesById(String id) {
        BlogImages blogImages = blogImagesRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        return blogImagesMapper.toBlogImagesResponse(blogImages);
    }

    public void deleteBlogImages(String blogID) {
        blogImagesRepository.deleteById(blogID);
    }

}
