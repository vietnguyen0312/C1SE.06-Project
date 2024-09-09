package com.example.Backend.dto.request.Cart;

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
    User user;
}
