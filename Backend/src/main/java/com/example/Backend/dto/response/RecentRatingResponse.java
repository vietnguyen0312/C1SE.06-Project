package com.example.Backend.dto.response;

import com.example.Backend.entity.Rating.RateRoom;
import com.example.Backend.entity.Rating.RateService;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecentRatingResponse {
    List<RateRoom> rateRooms;
    List<RateService> rateServices;
}
