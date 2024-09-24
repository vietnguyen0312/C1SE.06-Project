package com.example.Backend.repository.Blog;


import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BlogRepository extends JpaRepository<Blog, String> {

    Page<Blog> findAllByBlogType(BlogType blogType, Pageable pageable);
}
