package com.example.Backend.dto.response.Blog;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentMessageResponse {
    private String type;
    private BlogCommentResponse comment;
}
