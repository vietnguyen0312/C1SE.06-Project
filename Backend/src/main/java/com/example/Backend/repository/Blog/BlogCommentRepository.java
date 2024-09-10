package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogCommentRepository extends JpaRepository  <BlogComment, String> {

    Optional<BlogComment> findBlogCommentBy(String idBlog);
}
