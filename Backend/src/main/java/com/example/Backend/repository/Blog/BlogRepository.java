package com.example.Backend.repository.Blog;


import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BlogRepository extends JpaRepository<Blog, String> {

    Page<Blog> findByBlogTypeIn(List<BlogType> blogType, Pageable pageable);

    Page<Blog> findByBlogTypeInAndTitleOrBodyOrContentOpenContaining (List<BlogType> blogType, String title, String body, String contentOpen, Pageable pageable);
    Page<Blog> findByTitleOrBodyOrContentOpenContaining ( String title, String body, String contentOpen, Pageable pageable);
}
