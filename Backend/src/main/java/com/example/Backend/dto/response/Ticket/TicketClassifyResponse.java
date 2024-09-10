package com.example.Backend.dto.response.Ticket;

import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketClassifyResponse {
    String id;
    TicketType ticketType;
    Ticket ticket;
}
