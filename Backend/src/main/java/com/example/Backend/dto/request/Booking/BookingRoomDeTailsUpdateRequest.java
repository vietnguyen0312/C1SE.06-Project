package com.example.Backend.dto.request.Booking;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomDeTailsUpdateRequest {

    Instant checkIned;

    Instant checkOuted;


    public boolean isValid() {
        // Kiểm tra chỉ một trong hai giá trị khác null
        return (checkIned == null) != (checkOuted == null);
    }
}
