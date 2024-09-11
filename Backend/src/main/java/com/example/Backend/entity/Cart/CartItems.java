package com.example.Backend.entity.Cart;

import com.example.Backend.entity.Ticket.TicketClassify;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cart_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    Cart cart;

    @ManyToOne
    @JoinColumn(name = "ticket_classify_id")
    TicketClassify ticketClassify;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false)
    double total;
}
