package com.example.Backend.controller;

import com.example.Backend.dto.response.*;
import com.example.Backend.service.RevenueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/revenue")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RevenueController {
    RevenueService revenueService;

    @GetMapping("/revenue-overall")
    ApiResponse<List<RevenueResponse>> getRevenue() {
        return ApiResponse.<List<RevenueResponse>>builder()
                .result(revenueService.getAllRevenue())
                .build();
    }

    @GetMapping("/service-revenue")
    ApiResponse<PageResponse<ServiceRevenueResponse>> getTopServiceRevenue(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size,
            @RequestParam(value = "startDate", required = true) @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
            @RequestParam(value = "endDate", required = true) @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
    ) {
        return ApiResponse.<PageResponse<ServiceRevenueResponse>>builder()
                .result(revenueService.getTopService(startDate.toInstant(), endDate.toInstant(), page, size))
                .build();
    }

    @GetMapping("/room-type-revenue")
    ApiResponse<PageResponse<RoomTypeRevenueResponse>> getTopRoomTypeRevenue(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size,
            @RequestParam(value = "startDate", required = true) @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
            @RequestParam(value = "endDate", required = true) @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
    ) {
        return ApiResponse.<PageResponse<RoomTypeRevenueResponse>>builder()
                .result(revenueService.getTopRoomType(startDate.toInstant(), endDate.toInstant(), page, size))
                .build();
    }
}
