package com.example.Backend.dto.response.Rating;

import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.User.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateServiceResponse {

    String id;
    ServiceEntity serviceEntity;
    User user;
    int score;
    String comment;
}
