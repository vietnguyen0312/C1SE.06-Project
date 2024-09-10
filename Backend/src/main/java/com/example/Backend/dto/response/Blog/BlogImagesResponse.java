package com.example.Backend.dto.response.Blog;
import com.example.Backend.entity.Blog.Blog;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogImagesResponse {
    String id;
    String image;
    Blog blog;
}
