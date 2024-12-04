package com.example.Backend.controller;

import com.example.Backend.dto.request.Booking.BookingRoomCreationByStaffRequest;
import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.dto.response.PageResponse;
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
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomService.createBookingRoom(request))
                .build();
    }

    @PostMapping("/create_by_staff")
    public ApiResponse<BookingRoomResponse> createBookingRoomByStaff(@RequestBody @Valid BookingRoomCreationByStaffRequest request) {
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomService.createBookingRoomByStaff(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BookingRoomResponse> updateBookingRoom(
            @PathVariable String id,
            @RequestBody @Valid BookingRoomUpdateRequest request) {
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomService.updateBookingRoom(id, request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BookingRoomResponse> getBookingRoomById(@PathVariable String id) {
        return ApiResponse.<BookingRoomResponse>builder()
                .result(bookingRoomService.getBookingRoomById(id))
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<BookingRoomResponse>> getAllBookingRooms(
            @RequestParam(value = "isCustomer",required = false, defaultValue = "false")Boolean isCustomer,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size) {

        return ApiResponse.<PageResponse<BookingRoomResponse>>builder()
                .result(bookingRoomService.getBookingRooms(isCustomer, page, size))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBookingRoom(@PathVariable String id) {
        bookingRoomService.deleteBookingRoom(id);
        return ApiResponse.<Void>builder().build(); // Không có kết quả trả về
    }

    @GetMapping("/findByUser/{userId}")
    public ApiResponse<List<BookingRoomResponse>> getBookingRoomsByUser(@PathVariable("userId") String userId) {
        return ApiResponse.<List<BookingRoomResponse>>builder()
                .result(bookingRoomService.getBookingRoomsByUser(userId))
                .build();
    }
}
