package com.example.Backend.dto.response.Rating;

import com.example.Backend.entity.Room.Room;
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
public class RateRoomResponse {
    String id;
    Room room;
    User user;
    int score;
    String comment;
    Instant dateUpdate;
}
