package com.example.Backend.dto.request.Booking;

import com.example.Backend.entity.User.User;
import jakarta.validation.constraints.Positive;
import lombok.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomCreationRequest {
    @NotNull(message = "NOT_NULL")
    String userId;

    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Date checkInDate;

    @FutureOrPresent(message = "DATE_FUTURE_OR_PRESENT")
    Date checkOutDate;

    @Positive(message = "POSITIVE")
    double total;

    @NotNull(message = "NOT_NULL")
    String status;
}
