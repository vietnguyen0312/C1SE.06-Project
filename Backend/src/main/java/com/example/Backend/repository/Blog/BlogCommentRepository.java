package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogComment;
import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;


public interface BlogCommentRepository extends JpaRepository  <BlogComment, String> {

    Page<BlogComment> findAllByBlog(Blog Blog, Pageable pageable);
    Page<BlogComment> findAllByUser(User user, Pageable pageable);
}
