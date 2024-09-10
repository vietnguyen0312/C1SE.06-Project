package com.example.Backend.dto.request.Blog;
import com.example.Backend.entity.Blog.BlogType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogUpdateRequest {
    @NotBlank(message = "NOT_BLANK")
    @Size(max = 50, message = "TITLE_SIZE")
    String title;

    @NotBlank(message = "NOT_BLANK")
    @Size(max = 255, message = "BODY_SIZE")
    String body;
    String contentOpen;
    BlogType blogType;
    String status;

}
