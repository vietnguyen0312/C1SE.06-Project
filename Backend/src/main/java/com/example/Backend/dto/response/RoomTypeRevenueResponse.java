package com.example.Backend.dto.response;

import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.entity.Service.ServiceEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomTypeRevenueResponse {
    RoomType roomType;
    double revenue;
}
