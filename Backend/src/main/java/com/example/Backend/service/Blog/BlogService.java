package com.example.Backend.service.Blog;

import com.example.Backend.dto.request.Blog.BlogCreateRequest;
import com.example.Backend.dto.request.Blog.BlogUpdateRequest;
import com.example.Backend.dto.response.Blog.BlogResponse;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Blog.BlogMapper;
import com.example.Backend.repository.Blog.BlogRepository;
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
public class BlogService {
    BlogRepository blogRepository;
    BlogMapper blogMapper;
//    UserRepository userRepository;


    public BlogResponse createBlogContent (BlogCreateRequest request){
        Blog blog = blogMapper.toBlog(request);
        return blogMapper.toBlogResponse(blogRepository.save(blog));
    }

    public BlogResponse updateBlogContent (BlogUpdateRequest request, String id){
            Blog   blog = blogRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));
            blogMapper.updateBlog(blog,request);
            return blogMapper.toBlogResponse(blogRepository.save(blog));
    }

    public void deleteBlogContent (String id){
        blogRepository.deleteById(id);
    }

    public List<BlogResponse> getAllBlogContent(){
        return blogRepository.findAll().stream().map(blogMapper::toBlogResponse).toList();
    }

    public BlogResponse getBlogContent (String id){
        return blogMapper.toBlogResponse(blogRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));
    }

}
