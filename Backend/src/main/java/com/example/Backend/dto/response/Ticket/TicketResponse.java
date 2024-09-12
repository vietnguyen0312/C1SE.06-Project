package com.example.Backend.dto.response.Ticket;

import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.TicketType;
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
public class TicketResponse {
    String id;
    ServiceEntity serviceEntity;
    double price;
    int quantity;
    String status;
    Set<TicketType> ticketTypes;
}
