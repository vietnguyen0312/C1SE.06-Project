package com.example.Backend.dto.request.Rating;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateRoomUpdateRequest {
    @NotNull(message = "NOT_NULL")
    int  score;

    @Size(max = 255, message = "MAX_SIZE")
    String comment;
}
