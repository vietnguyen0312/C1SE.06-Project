package com.example.Backend.controller;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.service.Booking.BookingRoomDetailsService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("booking_room_details")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingRoomDetailsController {
    final BookingRoomDetailsService bookingRoomDetailsService;

    // Tạo mới BookingRoomDetails
    @PostMapping
    public ApiResponse<BookingRoomDetailsResponse> createBookingRoomDetails(@RequestBody @Valid BookingRoomDetailsRequest request) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService.createBookingRoomDetails(request);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Cập nhật BookingRoomDetails theo ID (giả sử có update method)
    @PutMapping("/{id}")
    public ApiResponse<BookingRoomDetailsResponse> git (@PathVariable String id, @RequestBody @Valid BookingRoomDetailsRequest request) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService.updateBookingRoomDetails(id, request);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Lấy BookingRoomDetails theo ID
    @GetMapping("/{id}")
    public ApiResponse<BookingRoomDetailsResponse> getBookingRoomDetailsById(@PathVariable String id) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService.getBookingRoomDetails(id);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Lấy tất cả BookingRoomDetails
    @GetMapping
    public ApiResponse<List<BookingRoomDetailsResponse>> getAllBookingRoomDetails() {
        List<BookingRoomDetailsResponse> bookingRoomDetailsResponses = bookingRoomDetailsService.getAllBookingRoomDetails();
        return ApiResponse.<List<BookingRoomDetailsResponse>>builder()
                .result(bookingRoomDetailsResponses)
                .build();
    }

    // Xóa BookingRoomDetails theo ID
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBookingRoomDetails(@PathVariable String id) {
        bookingRoomDetailsService.deleteBookingRoomDetails(id);
        return ApiResponse.<Void>builder().build();
    }

    // Lấy danh sách BookingRoomDetails theo BookingRoom (tìm theo bookingRoomId)
    @GetMapping("/byBookingRoom/{bookingRoomId}")
    public ApiResponse<List<BookingRoomDetailsResponse>> getBookingRoomDetailsByBookingRoom(@PathVariable("bookingRoomId") String bookingRoomId) {
        List<BookingRoomDetailsResponse> bookingRoomDetailsResponses = bookingRoomDetailsService.getBookingRoomDetailsByBookingRoom(bookingRoomId);
        return ApiResponse.<List<BookingRoomDetailsResponse>>builder()
                .result(bookingRoomDetailsResponses)
                .build();
    }
}
