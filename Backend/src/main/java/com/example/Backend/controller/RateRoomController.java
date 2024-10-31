package com.example.Backend.controller;

import com.example.Backend.dto.request.Rating.RateRoomCreationRequest;
import com.example.Backend.dto.request.Rating.RateRoomUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Rating.RateRoomResponse;
import com.example.Backend.service.Rating.RateRoomService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rate-room")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RateRoomController {
    RateRoomService rateRoomService;

    @PostMapping
    public ApiResponse<RateRoomResponse> createRateRoom(@RequestBody @Valid RateRoomCreationRequest request) {
        return ApiResponse.<RateRoomResponse>builder()
                .result(rateRoomService.createRateRoom(request))
                .build();
    }

    @GetMapping("/user")
    public ApiResponse<List<RateRoomResponse>> getRateRoomByUser() {
        return ApiResponse.<List<RateRoomResponse>>builder()
                .result(rateRoomService.getRateRoomByUser())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<RateRoomResponse> updateRateRoom(@PathVariable String id,
                                                        @RequestBody @Valid RateRoomUpdateRequest request) {
        return ApiResponse.<RateRoomResponse>builder()
                .result(rateRoomService.updateRateRoom(id, request))
                .build();
    }

}
