package com.example.Backend.dto.request.Cart;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemsCreationRequest {
    @NotNull(message = "NOT_NULL")
    String idTicket;

    @Positive(message = "POSITIVE")
    int quantity;

    @PositiveOrZero(message = "POSITIVE_OR_ZERO")
    double total;
}
