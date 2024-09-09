package com.example.Backend.mapper.Ticket;

import com.example.Backend.dto.request.Ticket.TicketTypeRequest;
import com.example.Backend.dto.response.Ticket.TicketTypeResponse;
import com.example.Backend.entity.Ticket.TicketType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TicketTypeMapper {
    TicketType toEntity(TicketTypeRequest request);

    TicketTypeResponse toResponse(TicketType ticketType);
}
