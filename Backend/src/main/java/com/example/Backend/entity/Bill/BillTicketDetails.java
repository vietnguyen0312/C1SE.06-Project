package com.example.Backend.entity.Bill;

import com.example.Backend.entity.Ticket.Ticket;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "bill_ticket_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "billTicket_id")
    BillTicket billTicket;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    Ticket ticket;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false)
    double total;
}
