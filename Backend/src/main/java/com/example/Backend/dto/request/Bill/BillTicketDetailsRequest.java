package com.example.Backend.dto.request.Bill;

import com.example.Backend.entity.Bill.BillTicket;
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
public class BillTicketDetailsRequest {
    @NotNull(message = "NOT_NULL")
    private BillTicket billTicket;

    @NotNull(message = "NOT_NULL")
    private Ticket ticket;

    @Positive(message = "POSITIVE")
    private int quantity;

    @Positive(message = "POSITIVE")
    private double total;
}
