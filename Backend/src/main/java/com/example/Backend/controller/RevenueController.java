package com.example.Backend.controller;

import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.RevenueResponse;
import com.example.Backend.service.RevenueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/revenue")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RevenueController {
    RevenueService revenueService;

    @GetMapping
    ApiResponse<List<RevenueResponse>> getRevenue() {
        return ApiResponse.<List<RevenueResponse>>builder()
                .result(revenueService.getAllRevenue())
                .build();
    }
}
