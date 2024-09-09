package com.example.Backend.dto.request.Cart;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.Ticket.Ticket;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemsCreationRequest {
    @NotNull(message = "NOT_NULL")
    Cart cart;

    @NotNull(message = "NOT_NULL")
    Ticket ticket;

    @Positive(message = "POSITIVE")
    int quantity;

    @Positive(message = "POSITIVE")
    double total;
}
