package com.example.Backend.dto.response.Booking;

import com.example.Backend.entity.User.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomResponse {
    String id;
    User user;
    Date checkInDate;
    Date checkOutDate;
    double total;
    String status;

}
