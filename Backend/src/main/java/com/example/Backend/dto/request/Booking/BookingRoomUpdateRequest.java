package com.example.Backend.dto.request.Booking;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomUpdateRequest {
    @NotNull(message = "NOT_NULL")
    String status;

    @Future(message = "DATE_FUTURE")
    Date checkInDate;

    @Future(message = "DATE_FUTURE")
    Date checkOutDate;

    @Positive(message = "POSITIVE")
    double total;
}
