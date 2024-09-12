package com.example.Backend.dto.request.Ticket;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketCreationRequest {
    @NotNull(message = "NOT_NULL")
    String serviceId;

    @NotNull(message = "NOT_NULL")
    double price;

    @NotNull(message = "NOT_NULL")
    int quantity;

    @NotNull(message = "NOT_NULL")
    Set<String> ticketTypeId;
}
