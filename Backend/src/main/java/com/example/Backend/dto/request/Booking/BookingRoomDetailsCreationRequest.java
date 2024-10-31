package com.example.Backend.dto.request.Booking;

import com.example.Backend.entity.Room.Room;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomDetailsCreationRequest {
    @NotNull(message = "NOT_NULL")
    String roomId;


    @NotNull(message = "NOT_NULL")
    String bookingId;


    @Column(nullable = false)
    double price;

    Instant checkIned;

    Instant checkOuted;

    String status;
}
