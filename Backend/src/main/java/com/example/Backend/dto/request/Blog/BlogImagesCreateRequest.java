package com.example.Backend.dto.request.Blog;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogImagesCreateRequest {
    @NotBlank(message = "NOT_BLANK")
    String image;

    @NotBlank(message = "NOT_NULL")
    String blogId;
}
