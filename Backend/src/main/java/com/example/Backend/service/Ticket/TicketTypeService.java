package com.example.Backend.service.Ticket;

import com.example.Backend.dto.request.Ticket.TicketTypeRequest;
import com.example.Backend.dto.response.Ticket.TicketTypeResponse;
import com.example.Backend.entity.Ticket.TicketType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Ticket.TicketTypeMapper;
import com.example.Backend.repository.Ticket.TicketTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketTypeService {
    TicketTypeRepository ticketTypeRepository;
    TicketTypeMapper ticketTypeMapper;

    @PreAuthorize("hasRole('MANAGER')")
    public TicketTypeResponse createTicketType(TicketTypeRequest request) {
        if (ticketTypeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.EXISTED);
        }
        TicketType ticketType = ticketTypeMapper.toEntity(request);
        TicketType savedTicketType = ticketTypeRepository.save(ticketType);
        return ticketTypeMapper.toResponse(savedTicketType);
    }

    public List<TicketTypeResponse> getAllTicketTypes() {
        return ticketTypeRepository.findAll().stream()
                .map(ticketTypeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TicketTypeResponse getTicketTypeById(String id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return ticketTypeMapper.toResponse(ticketType);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public TicketTypeResponse updateTicketType(String id, TicketTypeRequest request) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        ticketType.setName(request.getName());
        TicketType updatedTicketType = ticketTypeRepository.save(ticketType);
        return ticketTypeMapper.toResponse(updatedTicketType);
    }
}
