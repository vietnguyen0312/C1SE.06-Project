package com.example.Backend.entity.Ticket;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "ticket_classify")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketClassify {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "ticketType_id")
    TicketType ticketType;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    Ticket ticket;
}
