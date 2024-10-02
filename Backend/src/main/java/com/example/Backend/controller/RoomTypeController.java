package com.example.Backend.controller;

import com.example.Backend.dto.request.Room.RoomTypeRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.service.Room.RoomTypeService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room_type")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomTypeController {
    RoomTypeService roomTypeService;

    @PostMapping
    ApiResponse<RoomTypeResponse> creaRoomType(@RequestBody @Valid RoomTypeRequest request) {
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.createRoomType(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoomTypeResponse>> getAllRoomTypes() {
        return ApiResponse.<List<RoomTypeResponse>>builder()
                .result(roomTypeService.getRoomTypesAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<RoomTypeResponse> getRoomTypeById(@PathVariable String id) {
        RoomTypeResponse roomTypeResponse = roomTypeService.getRoomTypeById(id);
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeResponse)
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteRoomType(@PathVariable String id) {
        roomTypeService.deleteRoomType(id);
        return ApiResponse.<Void>builder()
                .build(); // Không có kết quả trả về
    }

}