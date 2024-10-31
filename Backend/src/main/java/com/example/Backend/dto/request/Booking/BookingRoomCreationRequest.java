package com.example.Backend.dto.request.Booking;

import com.example.Backend.entity.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Positive;
import lombok.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomCreationRequest {

    //    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Instant checkInDate;

    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Instant checkOutDate;

    @Positive(message = "POSITIVE")
    double total;

    @Temporal(TemporalType.TIMESTAMP)
    Instant datePay;

    @NotNull(message = "NOT_NULL") // đang text commit
    String status;
}
