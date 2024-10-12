package com.example.Backend.dto.request.Blog;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

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

    Instant dateTimeEdit;

    String contentOpen;

    @NotBlank(message = "NOT_BLANK")
    String blogTypeId;

    @NotBlank(message = "NOT_BLANK")
    String userId;
}
