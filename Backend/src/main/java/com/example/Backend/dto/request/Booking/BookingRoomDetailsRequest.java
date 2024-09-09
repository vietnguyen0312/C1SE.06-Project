package com.example.Backend.dto.request.Booking;

import com.example.Backend.entity.Room.Room;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomDetailsRequest {
    @NotNull(message = "NOT_NULL")
    Room room;
}
