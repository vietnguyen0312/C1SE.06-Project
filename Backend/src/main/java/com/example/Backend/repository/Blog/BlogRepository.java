package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, String> {

    List<Blog> findAllByBlogType(BlogType blogType);
}
