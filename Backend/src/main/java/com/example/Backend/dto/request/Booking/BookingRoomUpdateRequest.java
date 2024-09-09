package com.example.Backend.dto.request.Booking;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomUpdateRequest {
    @NotNull(message = "NOT_NULL")
    String status;
}
