package com.example.Backend.dto.request.Rating;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateServiceUpdateRequest {

    @NotNull(message = "NOT_NULL")
    int score;

    String comment;
}
