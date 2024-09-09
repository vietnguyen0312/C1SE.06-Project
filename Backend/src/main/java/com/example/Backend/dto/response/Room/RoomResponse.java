package com.example.Backend.dto.response.Room;

import com.example.Backend.entity.Room.RoomType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse {
    String id;
    RoomType roomType;
    int roomNumber ;
    String status;
}
