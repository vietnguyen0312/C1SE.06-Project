package com.example.Backend.dto.request.Ticket;

import com.example.Backend.entity.Ticket.TicketType;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketClassifyRequest {
    @NotBlank(message = "NOT_BLANK")
    String ticketTypeId;

    @NotBlank(message = "NOT_BLANK")
    String ticketId;
}
