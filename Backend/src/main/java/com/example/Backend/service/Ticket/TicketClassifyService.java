package com.example.Backend.service.Ticket;

import com.example.Backend.dto.request.Ticket.TicketClassifyRequest;
import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.response.Ticket.TicketClassifyResponse;
import com.example.Backend.dto.response.Ticket.TicketResponse;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketClassify;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.mapper.Ticket.TicketClassifyMapper;
import com.example.Backend.repository.Ticket.TicketClassifyRepository;
import com.example.Backend.repository.Ticket.TicketTypeRepository;
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
public class TicketClassifyService {
    TicketClassifyRepository ticketClassifyRepository;
    TicketTypeRepository ticketTypeRepository;
    TicketClassifyMapper ticketClassifyMapper;

    public TicketClassifyResponse createTicketClassify(TicketClassifyRequest request) {
        return ticketClassifyMapper.toResponse(ticketClassifyRepository.save(ticketClassifyMapper.toEntity(request)));
    }

    public List<TicketClassifyResponse> getAllTicketClassify() {
        return ticketClassifyRepository.findAll().stream()
                .map(ticketClassifyMapper::toResponse)
                .toList();
    }

    public TicketClassifyResponse getTicketClassifyById(String id) {
        TicketClassify ticketClassify = ticketClassifyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return ticketClassifyMapper.toResponse(ticketClassify);
    }

    public void deleteTicketClassify(String id) {
        TicketClassify ticketClassify = ticketClassifyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        ticketClassifyRepository.delete(ticketClassify);
    }

    public List<TicketClassifyResponse> getByTicketType(String ticketTypeId) {
        return ticketClassifyRepository.findAllByTicketType(ticketTypeRepository.findById(ticketTypeId)
                .orElseThrow(()->new AppException(ErrorCode.NOT_EXISTED)))
                .stream().map(ticketClassifyMapper::toResponse).toList();
    }
}
