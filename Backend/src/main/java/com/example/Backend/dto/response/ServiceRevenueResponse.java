package com.example.Backend.dto.response;

import com.example.Backend.entity.Service.ServiceEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRevenueResponse {
    ServiceEntity serviceEntity;
    double revenue;
}
