package com.example.Backend.dto.response.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Room.Room;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomDetailsResponse {
    String id;
    BookingRoom bookingRoom;
    Room room;
    double price;
    Instant checkIned;
    Instant checkOuted;
    String status;
}
