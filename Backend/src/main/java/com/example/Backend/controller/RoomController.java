package com.example.Backend.controller;

import com.example.Backend.dto.request.Room.RoomCreationRequest;
import com.example.Backend.dto.request.Room.RoomUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Room.RoomResponse;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.repository.Room.RoomTypeRepository;
import com.example.Backend.service.Room.RoomService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomController {
    RoomService roomService;
    RoomTypeRepository roomTypeRepository;

    @PostMapping
    ApiResponse<RoomResponse> createRoom(@RequestBody @Valid RoomCreationRequest request) {
        RoomResponse roomResponse = roomService.createRoom(request);
        return ApiResponse.<RoomResponse>builder()
                .result(roomResponse)
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<RoomResponse> updateRoom(@PathVariable String id, @RequestBody @Valid RoomUpdateRequest request) {
        RoomResponse roomResponse = roomService.updateRoom(id, request);
        return ApiResponse.<RoomResponse>builder()
                .result(roomResponse)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<RoomResponse> getRoomById(@PathVariable String id) {
        RoomResponse roomResponse = roomService.getRoomById(id);
        return ApiResponse.<RoomResponse>builder()
                .result(roomResponse)
                .build();
    }

    @GetMapping
    ApiResponse<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> rooms = roomService.getAllRooms();
        return ApiResponse.<List<RoomResponse>>builder()
                .result(rooms)
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
        return ApiResponse.<Void>builder()
                .build(); // Không có kết quả trả về
    }

    @GetMapping("/findByRoomType/{roomTypeId}")
    ApiResponse<List<RoomResponse>> getRoomByRoomType(@PathVariable("roomTypeId") String roomTypeId) {
        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        List<RoomResponse> rooms = roomService.getRoomByRoomType(roomType);
        return ApiResponse.<List<RoomResponse>>builder()
                .result(rooms)
                .build();
    }
}
