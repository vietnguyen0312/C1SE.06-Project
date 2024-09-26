package com.example.Backend.controller;

import com.example.Backend.dto.request.Ticket.TicketTypeRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Ticket.TicketTypeResponse;
import com.example.Backend.service.Ticket.TicketTypeService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket-types")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TicketTypeController {
    TicketTypeService ticketTypeService;

    @PostMapping
    ApiResponse<TicketTypeResponse> createTicketType(@RequestBody @Valid TicketTypeRequest request){
        return ApiResponse.<TicketTypeResponse>builder()
                .result(ticketTypeService.createTicketType(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<TicketTypeResponse>> getAllTicketType(){
        return ApiResponse.<List<TicketTypeResponse>>builder()
                .result(ticketTypeService.getAllTicketTypes())
                .build();
    }

}
