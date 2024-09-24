package com.example.Backend.controller;

import com.example.Backend.dto.request.Bill.BillTicketCreationRequest;
import com.example.Backend.dto.request.Bill.BillTicketUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
import com.example.Backend.service.Bill.BillTicketService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill-ticket")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketController {
    BillTicketService billTicketService;

    @PostMapping
    ApiResponse<BillTicketResponse> createBillTicket(
            @RequestBody @Valid BillTicketCreationRequest request){
        return ApiResponse.<BillTicketResponse>builder()
                .result(billTicketService.createBillTicket(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<BillTicketResponse>> getAllBillTickets() {
        return ApiResponse.<List<BillTicketResponse>>builder()
                .result(billTicketService.getBills())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BillTicketResponse> getBillTicketById(@PathVariable("id")String id){
        return ApiResponse.<BillTicketResponse>builder()
                .result(billTicketService.getBill(id))
                .build();
    }

    @GetMapping("/get-bill-by-user/{id}")
    ApiResponse<List<BillTicketResponse>> getBillTicketsByUser(@PathVariable("id")String id) {
        return ApiResponse.<List<BillTicketResponse>>builder()
                .result(billTicketService.getBillsByUser(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<BillTicketResponse> updateBillTicket(
            @PathVariable("id")String id,
            @RequestBody @Valid BillTicketUpdateRequest request) {
        return ApiResponse.<BillTicketResponse>builder()
                .result(billTicketService.updateBillTicket(request, id))
                .build();
    }
}
