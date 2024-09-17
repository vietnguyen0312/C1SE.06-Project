package com.example.Backend.repository.Blog;

import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.Blog.BlogComment;
import com.example.Backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogCommentRepository extends JpaRepository  <BlogComment, String> {

    List<BlogComment> findAllByBlog(Blog Blog);
    List<BlogComment> findAllByUser(User user);
}
