package com.example.Backend.dto.request.Blog;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogTypeUpdateRequest {
    @NotBlank(message = "NOT_BLANK")
    String name;
}
