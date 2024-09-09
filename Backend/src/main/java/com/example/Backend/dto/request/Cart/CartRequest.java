package com.example.Backend.dto.request.Cart;

import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.User.User;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartRequest {
    @NotNull(message = "NOT_NULL")
    UserCreationRequest userCreationRequest;
}
