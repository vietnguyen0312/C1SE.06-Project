package com.example.Backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueResponse {
    String month;
    Double rooms;
    Double tickets;
    int numOfBill;
    Double totalRevenue;
}
