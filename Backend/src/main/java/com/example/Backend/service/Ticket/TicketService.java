package com.example.Backend.service.Ticket;

import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.request.Ticket.TicketUpdateRequest;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.dto.response.Ticket.TicketResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Service.ServiceMapper;
import com.example.Backend.mapper.Ticket.TicketMapper;
import com.example.Backend.repository.Service.ServiceRepository;
import com.example.Backend.repository.Ticket.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketService {
    TicketRepository ticketRepository;
    ServiceRepository serviceRepository;
    TicketMapper ticketMapper;
    ServiceMapper serviceMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public TicketResponse createTicket(TicketCreationRequest request) {
        Ticket ticket = ticketMapper.toEntity(request);
        Ticket savedTicket = ticketRepository.save(ticket);
        return ticketMapper.toResponse(savedTicket);
    }

    public Map<ServiceResponse,List<TicketResponse>> getTickets(String search) {
        Map<ServiceResponse,List<TicketResponse>> entityListHashMap = new LinkedHashMap<>();

        List<ServiceEntity> serviceEntities = serviceRepository.findByNameOrDescriptionContaining(search, search);

        serviceEntities.forEach(serviceEntity -> {
            List<Ticket> tickets = ticketRepository
                    .findByServiceEntity_NameContainingAndServiceEntityIsOrServiceEntity_DescriptionContainingAndServiceEntityIs
                            (search, serviceEntity, search, serviceEntity);

            if (!tickets.isEmpty())
                entityListHashMap.put(serviceMapper.toResponse(serviceEntity),tickets.stream().map(ticketMapper::toResponse).toList());
        });

        return entityListHashMap;
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return ticketMapper.toResponse(ticket);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteTicket(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketRepository.delete(ticket);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public TicketResponse updateTicket(TicketUpdateRequest request, String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketMapper.updateTicket(ticket, request);
        return ticketMapper.toResponse(ticketRepository.save(ticket));
    }

}
