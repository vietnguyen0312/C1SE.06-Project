package com.example.Backend.controller;

import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.service.Booking.BookingRoomService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking_room")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingRoomController {
    BookingRoomService bookingRoomService;

    @PostMapping
    public ApiResponse<BookingRoomResponse> createBookingRoom(@RequestBody @Valid BookingRoomCreationRequest request) {
        BookingRoomResponse bookingRoomResponse = bookingRoomService.createBookingRoom(request);
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomResponse)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BookingRoomResponse> updateBookingRoom(@PathVariable String id, @RequestBody @Valid BookingRoomUpdateRequest request) {
        BookingRoomResponse bookingRoomResponse = bookingRoomService.updateBookingRoom(id, request);
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BookingRoomResponse> getBookingRoomById(@PathVariable String id) {
        BookingRoomResponse bookingRoomResponse = bookingRoomService.getBookingRoom(id);
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomResponse)
                .build();
    }

    @GetMapping
    public ApiResponse<List<BookingRoomResponse>> getAllBookingRooms() {
        List<BookingRoomResponse> bookingRooms = bookingRoomService.getBookingRooms();
        return ApiResponse.<List<BookingRoomResponse>>builder()
                .result(bookingRooms)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBookingRoom(@PathVariable String id) {
        bookingRoomService.deleteBookingRoom(id);
        return ApiResponse.<Void>builder().build(); // Không có kết quả trả về
    }

    @GetMapping("/findByUser/{userId}")
    public ApiResponse<List<BookingRoomResponse>> getBookingRoomsByUser(@PathVariable("userId") String userId) {
        List<BookingRoomResponse> bookingRooms = bookingRoomService.getBookingRoomsByUser(userId);
        return ApiResponse.<List<BookingRoomResponse>>builder()
                .result(bookingRooms)
                .build();
    }
}
