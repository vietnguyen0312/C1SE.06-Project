package com.example.Backend.dto.response.Service;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceResponse {
    String id;
    String name;
    String description;
    String image;
    String serviceTypeId;
}
