package com.example.Backend.dto.response.QuestionChatbot;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FAQResponse {
    String intent;
    String description;
}