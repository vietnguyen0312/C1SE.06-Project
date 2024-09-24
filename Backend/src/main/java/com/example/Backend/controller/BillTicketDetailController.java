package com.example.Backend.controller;

import com.example.Backend.dto.request.Bill.BillTicketDetailsRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.service.Bill.BillTicketDetailsService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill-ticket-detail")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketDetailController {
    BillTicketDetailsService billTicketDetailsService;

    @PostMapping
    ApiResponse<BillTicketDetailsResponse> createBillTicketDetail(
            @RequestBody @Valid BillTicketDetailsRequest request) {
        return ApiResponse.<BillTicketDetailsResponse>builder()
                .result(billTicketDetailsService.createBillTicketDetails(request))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BillTicketDetailsResponse> getBillTicketDetail(@PathVariable("id")String id) {
        return ApiResponse.<BillTicketDetailsResponse>builder()
                .result(billTicketDetailsService.getBillTicketDetailsById(id))
                .build();
    }

    @GetMapping("/get-by-bill/{id}")
    ApiResponse<List<BillTicketDetailsResponse>> getBillTicketDetailsByBill(
            @PathVariable("id")String id) {
        return ApiResponse.<List<BillTicketDetailsResponse>>builder()
                .result(billTicketDetailsService.getBillTicketDetailsByBillTicket(id))
                .build();
    }
}
