package com.example.Backend.dto.request.Blog;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogCreateRequest {

    @NotBlank(message = "NOT_BLANK")
    String title;

    @NotBlank(message = "NOT_BLANK")
    String body;

    String contentOpen;

    @NotBlank(message = "NOT_BLANK")
    String blogTypeId;

    @NotBlank(message = "NOT_BLANK")
    String userId;
}
