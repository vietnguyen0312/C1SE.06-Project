package com.example.Backend.dto.response.Booking;

import com.example.Backend.entity.User.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomResponse {
    String id;
    User user;
    Instant checkInDate;
    Instant checkOutDate;
    double total;
    String status;
    Instant datePay;

}
