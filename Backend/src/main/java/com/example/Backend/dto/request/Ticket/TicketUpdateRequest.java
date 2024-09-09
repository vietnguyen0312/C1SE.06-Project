package com.example.Backend.dto.request.Ticket;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketUpdateRequest {

    @NotNull(message = "NOT_NULL")
    double price;

    @NotNull(message = "NOT_NULL")
    int quantity;

    @NotNull(message = "NOT_NULL")
    String status;
}
