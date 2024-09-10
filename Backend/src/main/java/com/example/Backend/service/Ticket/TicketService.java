package com.example.Backend.service.Ticket;

import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.request.Ticket.TicketUpdateRequest;
import com.example.Backend.dto.response.Ticket.TicketResponse;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Ticket.TicketMapper;
import com.example.Backend.repository.Ticket.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketService {
    TicketRepository ticketRepository;
    TicketMapper ticketMapper;

    public TicketResponse createTicket(TicketCreationRequest request) {
        Ticket ticket = ticketMapper.toEntity(request);
        Ticket savedTicket = ticketRepository.save(ticket);
        return ticketMapper.toResponse(savedTicket);
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(ticketMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return ticketMapper.toResponse(ticket);
    }

    public void deleteTicket(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketRepository.delete(ticket);
    }

    public TicketResponse updateTicket(TicketUpdateRequest request, String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketMapper.updateTicket(ticket, request);
        return ticketMapper.toResponse(ticketRepository.save(ticket));
    }

}
