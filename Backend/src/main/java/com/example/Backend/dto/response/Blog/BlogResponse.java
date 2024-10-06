package com.example.Backend.dto.response.Blog;

import com.example.Backend.entity.Blog.BlogImages;
import com.example.Backend.entity.Blog.BlogType;
import com.example.Backend.entity.User.User;
import com.example.Backend.repository.Blog.BlogTypeRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
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
    String CreatedDate;
    Instant dateTimeEdit;
    String status;
    BlogType blogType ;
    User user;

}
