package com.example.Backend.dto.response.User;

import com.example.Backend.entity.User.CustomerType;
import com.example.Backend.entity.User.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String email;
    String phoneNumber;
    Date dob;
    String gender;
    String avatar;
    CustomerType customerType;
    Set<RoleResponse> roles;
}
