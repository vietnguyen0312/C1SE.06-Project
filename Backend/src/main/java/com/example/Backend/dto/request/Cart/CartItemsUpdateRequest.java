package com.example.Backend.dto.request.Cart;

import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemsUpdateRequest {
    @Positive(message = "POSITIVE")
    int quantity;

    @Positive(message = "POSITIVE")
    double total;
}
