package com.example.Backend.dto.request.Bill;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketDetailsRequest {
    @NotNull(message = "NOT_NULL")
    private String idBillTicket;

    @NotNull(message = "NOT_NULL")
    private String idTicket;

    @Positive(message = "POSITIVE")
    private int quantity;

    @PositiveOrZero(message = "POSITIVE_OR_ZERO")
    private double total;
}
