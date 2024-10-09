package com.example.Backend.dto.response.Cart;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemsResponse {
    String id;
    Cart cart;
    Ticket ticket;
    int quantity;
    double total;
}
