package com.example.Backend.controller;

import com.example.Backend.dto.request.Bill.BillTicketDetailsRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.service.Bill.BillTicketDetailsService;
import com.example.Backend.service.Bill.BillTicketService;
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
    BillTicketService billTicketService;

    @PostMapping
    ApiResponse<BillTicketDetailsResponse> createBillTicketDetail(
            @RequestBody @Valid BillTicketDetailsRequest request) {
        return ApiResponse.<BillTicketDetailsResponse>builder()
                .result(billTicketDetailsService.createBillTicketDetails(request))
                .build();
    }

    @GetMapping("/get-by-bill/{id}")
    ApiResponse<List<MapEntryResponse<ServiceResponse,MapEntryResponse<String, List<BillTicketDetailsResponse>>>>> getBillTicketDetailsByBill(
            @PathVariable("id")String id) {
        billTicketService.getBill(id);
        return ApiResponse.<List<MapEntryResponse<ServiceResponse,MapEntryResponse<String, List<BillTicketDetailsResponse>>>>>builder()
                .result(billTicketDetailsService.getBillTicketDetailsByBillTicket(id))
                .build();
    }
}
