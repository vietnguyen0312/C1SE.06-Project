package com.example.Backend.dto.request.Rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateServiceCreationRequest {

    @NotNull(message = "NOT_NULL")
    String serviceId;

    @NotNull(message = "NOT_NULL")
    @Min(value = 1, message = "SCORE_MIN_1")
    @Max(value = 5, message = "SCORE_MAX_5")
    int score;

    String comment;

    @NotNull
    String billTicketDetailId;

    @Builder.Default
    Instant dateUpdate = Instant.now();
}
