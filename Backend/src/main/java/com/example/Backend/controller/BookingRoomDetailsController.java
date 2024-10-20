package com.example.Backend.controller;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Booking.BookingRoomDetails;
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
    public ApiResponse<BookingRoomDetailsResponse> createBookingRoomDetails(
            @RequestBody @Valid BookingRoomDetailsRequest request) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService
                .createBookingRoomDetails(request);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Cập nhật BookingRoomDetails theo ID (giả sử có update method)
    @PutMapping("/{id}")
    public ApiResponse<BookingRoomDetailsResponse> git(@PathVariable String id,
            @RequestBody @Valid BookingRoomDetailsRequest request) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService.updateBookingRoomDetails(id,
                request);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Lấy BookingRoomDetails theo ID
    @GetMapping("/{id}")
    public ApiResponse<BookingRoomDetailsResponse> getBookingRoomDetailsById(@PathVariable String id) {
        BookingRoomDetailsResponse bookingRoomDetailsResponse = bookingRoomDetailsService.getBookingRoomDetailsById(id);
        return ApiResponse.<BookingRoomDetailsResponse>builder()
                .result(bookingRoomDetailsResponse)
                .build();
    }

    // Lấy tất cả BookingRoomDetails
    @GetMapping
    public ApiResponse<PageResponse<BookingRoomDetailsResponse>> getAllBookingRoomDetails(
            @RequestParam(value = "isCustomer",required = false, defaultValue = "false")Boolean isCustomer,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size
    ) {
        return ApiResponse.<PageResponse<BookingRoomDetailsResponse>>builder()
                .result(bookingRoomDetailsService.getAllBookingRoomDetails(isCustomer, page, size))
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
    public ApiResponse<List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>>>getBookingRoomDetailsByBookingRoom(
            @PathVariable("bookingRoomId") String bookingRoomId) {
        return ApiResponse.<List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>>>builder()
                .result(bookingRoomDetailsService.getBookingRoomDetailsByBookingRoom(bookingRoomId))
                .build();
    }
}
