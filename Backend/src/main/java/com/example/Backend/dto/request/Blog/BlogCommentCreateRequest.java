package com.example.Backend.dto.request.Blog;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogCommentCreateRequest {
    @NotBlank(message = "NOT_BLANK")
    String userId;

    @NotBlank(message = "NOT_BLANK")
    String blogId;

    @NotBlank(message = "NOT_BLANK")
    @Size(max = 255,message = "COMMENT_SIZE")
    String comment;
}
