package com.example.Backend.dto.request.Rating;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateRoomCreationRequest {

    @NotNull(message = "NOT_NULL")
    double  score;

    @NotNull(message = "NOT_NULL")
    String  bookingRoomDetailsID;

    @Size(max = 255, message = "MAX_SIZE")
    String comment;

    @NotNull(message = "NOT_NULL")
    Instant dateUpdate;
}
