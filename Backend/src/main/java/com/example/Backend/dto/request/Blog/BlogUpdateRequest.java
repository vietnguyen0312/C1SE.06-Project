package com.example.Backend.dto.request.Blog;
import com.example.Backend.entity.Blog.BlogType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogUpdateRequest {
    @NotBlank(message = "NOT_BLANK")
    @Size(max = 100, message = "TITLE_SIZE")
    String title;

    @NotBlank(message = "NOT_BLANK")
    @Size(max = 5000, message = "BODY_SIZE")
    String body;
    String contentOpen;
    BlogType blogType;
    String status;


}
