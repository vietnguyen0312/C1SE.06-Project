package com.example.Backend.dto.request.Blog;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import  lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogCommentUpdateRequest {
    @NotBlank(message = "NOT_BLANK")
    @Size(max = 255,message = "COMMENT_SIZE")
    String comment;
}
