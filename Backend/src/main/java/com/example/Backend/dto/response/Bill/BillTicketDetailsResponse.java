package com.example.Backend.dto.response.Bill;

import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.Ticket.Ticket;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketDetailsResponse {
    String id;
    BillTicket billTicket;
    Ticket ticket;
    int quantity;
    double total;
    String status;
}
