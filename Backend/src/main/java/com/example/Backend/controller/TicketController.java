package com.example.Backend.controller;

import com.example.Backend.dto.request.Ticket.TicketCreationRequest;
import com.example.Backend.dto.request.Ticket.TicketUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.dto.response.Ticket.TicketResponse;
import com.example.Backend.service.Ticket.TicketService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketController {
    TicketService ticketService;

    @GetMapping
    ApiResponse<List<MapEntryResponse<ServiceResponse,List<TicketResponse>>>> getTickets(
            @RequestParam(value = "search", required = false) String search
    ){
        return ApiResponse.<List<MapEntryResponse<ServiceResponse,List<TicketResponse>>>>builder()
                .result(ticketService.getTickets(search))
                .build();
    }

    @PostMapping
    ApiResponse<TicketResponse> createTicket(@RequestBody @Valid TicketCreationRequest request) {
        return ApiResponse.<TicketResponse>builder()
                .result(ticketService.createTicket(request))
                .build();
    }

    @GetMapping("/getByIdService/{id}")
    ApiResponse<MapEntryResponse<ServiceResponse,List<TicketResponse>>> getTicketByIdService(@PathVariable("id")String id) {
        return ApiResponse.<MapEntryResponse<ServiceResponse,List<TicketResponse>>>builder()
                .result(ticketService.getTicketByIdService(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<TicketResponse> updateTicket(@PathVariable("id")String id, @RequestBody @Valid TicketUpdateRequest request) {
        return ApiResponse.<TicketResponse>builder()
                .result(ticketService.updateTicket(request,id))
                .build();
    }
}
