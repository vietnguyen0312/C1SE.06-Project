package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogImagesRepository extends JpaRepository<BlogImages, String> {
    List<BlogImages> findAllByBlog(Blog blog);
    boolean existsByImage(String name);
}
