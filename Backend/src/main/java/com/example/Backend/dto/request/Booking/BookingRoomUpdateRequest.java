package com.example.Backend.dto.request.Booking;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomUpdateRequest {

    @NotBlank(message = "NOT_BLANK")
    String status;

//    @Future(message = "DATE_FUTURE")
//    Instant checkInDate;
//
//    @Future(message = "DATE_FUTURE")
//    Instant checkOutDate;
//
//    @Positive(message = "POSITIVE")
//    double total;
}
