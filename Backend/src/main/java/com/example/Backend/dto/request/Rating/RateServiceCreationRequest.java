package com.example.Backend.dto.request.Rating;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateServiceCreationRequest {

    @NotNull(message = "NOT_NULL")
    String serviceId;

    @NotNull(message = "NOT_NULL")
    String userId;

    @NotNull(message = "NOT_NULL")
    int score;

    String comment;
}
