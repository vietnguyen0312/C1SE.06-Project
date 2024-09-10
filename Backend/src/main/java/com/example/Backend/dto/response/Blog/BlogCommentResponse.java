package com.example.Backend.dto.response.Blog;
import com.example.Backend.entity.Blog.Blog;
import com.example.Backend.entity.User.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogCommentResponse {
    String id;
    User user;
    Blog blog;
    String comment;
}
