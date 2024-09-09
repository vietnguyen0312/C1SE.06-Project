package com.example.Backend.mapper.Ticket;

import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.request.Ticket.TicketUpdateRequest;
import com.example.Backend.dto.response.Ticket.TicketResponse;
import com.example.Backend.entity.Ticket.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TicketMapper {
    TicketResponse toResponse(Ticket ticket);

    void updateTicket(@MappingTarget Ticket ticket, TicketUpdateRequest request);

    Ticket toEntity(TicketCreationRequest request);
}
