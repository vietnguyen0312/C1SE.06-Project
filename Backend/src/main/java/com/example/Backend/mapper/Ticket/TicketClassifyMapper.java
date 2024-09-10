package com.example.Backend.mapper.Ticket;

import com.example.Backend.dto.request.Ticket.TicketClassifyRequest;
import com.example.Backend.dto.request.Ticket.TicketTypeRequest;
import com.example.Backend.dto.response.Ticket.TicketClassifyResponse;
import com.example.Backend.dto.response.Ticket.TicketTypeResponse;
import com.example.Backend.entity.Ticket.TicketClassify;
import com.example.Backend.entity.Ticket.TicketType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TicketClassifyMapper {
    TicketClassify toEntity(TicketClassifyRequest request);

    TicketClassifyResponse toResponse(TicketClassify ticketClassify);
}
