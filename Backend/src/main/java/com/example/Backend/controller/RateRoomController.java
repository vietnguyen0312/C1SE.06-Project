package com.example.Backend.controller;

import com.example.Backend.dto.request.Rating.RateRoomCreationRequest;
import com.example.Backend.dto.request.Rating.RateRoomUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.PageResponse;
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

    @GetMapping("/by-room-type/{roomTypeID}")
    public ApiResponse<PageResponse<RateRoomResponse>> getRateRoomsByRoomType(
            @PathVariable String roomTypeID,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size) {

        PageResponse<RateRoomResponse> rateRoomsPageResponse = rateRoomService.getRateRoomByRoomType(roomTypeID, page, size);

        return ApiResponse.<PageResponse<RateRoomResponse>>builder()
                .result(rateRoomsPageResponse)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteRateRoom(@PathVariable String id) {
        rateRoomService.deleteRateRoom(id);
        return ApiResponse.<Void>builder()
                .build();
    }
}
