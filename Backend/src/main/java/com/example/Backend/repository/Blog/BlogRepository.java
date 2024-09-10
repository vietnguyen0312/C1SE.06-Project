package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, String> {
}
