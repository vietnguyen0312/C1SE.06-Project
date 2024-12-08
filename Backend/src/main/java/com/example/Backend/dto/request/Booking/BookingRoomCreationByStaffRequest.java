package com.example.Backend.dto.request.Booking;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomCreationByStaffRequest {

    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Instant checkInDate;

    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Instant checkOutDate;

    @Positive(message = "POSITIVE")
    double total;

    @Temporal(TemporalType.TIMESTAMP)
    Instant datePay;

    @NotNull(message = "NOT_NULL") // đang text commit
    String status;

    @NotNull(message = "NOT_NULL")
    String user;

}
