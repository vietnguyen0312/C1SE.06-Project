package com.example.Backend.service.Ticket;

import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.request.Ticket.TicketUpdateRequest;
import com.example.Backend.dto.response.MapEntryResponse;
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
import com.example.Backend.repository.Ticket.TicketTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketService {
    TicketRepository ticketRepository;
    TicketTypeRepository ticketTypeRepository;
    ServiceRepository serviceRepository;
    TicketMapper ticketMapper;
    ServiceMapper serviceMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public TicketResponse createTicket(TicketCreationRequest request) {
        Ticket ticket = ticketMapper.toEntity(request);

        ticket.setServiceEntity(serviceRepository.findById(request.getServiceId()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        ticket.setTicketType(ticketTypeRepository.findById(request.getTicketTypeId()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        if (ticketRepository.existsByServiceEntityAndTicketType(ticket.getServiceEntity(), ticket.getTicketType()))
            throw new AppException(ErrorCode.EXISTED);

        return ticketMapper.toResponse(ticketRepository.save(ticket));
    }

    public List<MapEntryResponse<ServiceResponse,List<TicketResponse>>> getTickets(String search) {
        List<MapEntryResponse<ServiceResponse,List<TicketResponse>>> ticketMap = new ArrayList<>();

        List<ServiceEntity> serviceEntities = serviceRepository
                .findByNameOrDescriptionContaining(search, search, Sort.by(Sort.Direction.ASC, "name"));

        serviceEntities.forEach(serviceEntity -> {
            Sort sort = Sort.by(Sort.Direction.DESC, "price");
            List<Ticket> tickets = ticketRepository
                    .findByServiceEntity_NameContainingAndServiceEntityIsOrServiceEntity_DescriptionContainingAndServiceEntityIs
                            (search, serviceEntity, search, serviceEntity, sort);

            if (!tickets.isEmpty())
                ticketMap.add(MapEntryResponse.<ServiceResponse, List<TicketResponse>>builder()
                                .key(serviceMapper.toResponse(serviceEntity))
                                .value(tickets.stream().map(ticketMapper::toResponse).toList())
                                .build());
        });

        return ticketMap;
    }

    public MapEntryResponse<ServiceResponse,List<TicketResponse>> getTicketByIdService(String id) {
        ServiceEntity serviceEntity = serviceRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));

        Sort sort = Sort.by(Sort.Direction.DESC, "price");
        List<Ticket> tickets = ticketRepository
                .findByServiceEntityIs(serviceEntity, sort);
        return MapEntryResponse.<ServiceResponse, List<TicketResponse>>builder()
                .key(serviceMapper.toResponse(serviceEntity))
                .value(tickets.stream().map(ticketMapper::toResponse).toList())
                .build();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public TicketResponse updateTicket(TicketUpdateRequest request, String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketMapper.updateTicket(ticket, request);
        return ticketMapper.toResponse(ticketRepository.save(ticket));
    }

}
