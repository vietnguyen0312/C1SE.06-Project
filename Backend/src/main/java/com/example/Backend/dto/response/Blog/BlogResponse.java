package com.example.Backend.dto.response.Blog;

import com.example.Backend.entity.Blog.BlogType;
import com.example.Backend.entity.User.User;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogResponse {
    String id;
    String title;
    String body;
    String contentOpen;
    Date dateTimeEdit;
    String status;
    String userId;
    String blogTypeId;
    String username;
    String blogTypeName;
    BlogType blogType;
    User user;
}
