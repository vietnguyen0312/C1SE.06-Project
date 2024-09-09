package com.example.Backend.dto.response.Room;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeResponse {
    private String id;
    private String name;
    private double price;
    private String image;
    private String detail;
    private int maxOfPeople;
}
