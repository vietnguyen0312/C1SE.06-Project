package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomMapper;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingRoomService {
    BookingRoomRepository bookingRoomRepository;
    BookingRoomMapper bookingRoomMapper;
    UserRepository userRepository;

    public BookingRoomResponse createBookingRoom(BookingRoomCreationRequest request) {
        BookingRoom bookingRoom = bookingRoomMapper.toBookingRoom(request);
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        bookingRoom.setUser(user);
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }

    public List<BookingRoomResponse> getBookingRooms() {
        return bookingRoomRepository.findAll().stream().map(bookingRoomMapper::toBookingRoomResponse).toList();
    }

    public BookingRoomResponse getBookingRoomById(String id) {
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    @PreAuthorize("hasAnyRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
    public BookingRoomResponse updateBookingRoom(String id, BookingRoomUpdateRequest request) {
        BookingRoom bookingRoom = bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        bookingRoomMapper.updateBookingRoom(bookingRoom, request);
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }

    @PostAuthorize("hasAnyRole('EMPLOYEE','EMPLOYER' ,'MANAGER')")
    public void deleteBookingRoom(String id) {
        bookingRoomRepository.deleteById(id);
    }

    public List<BookingRoomResponse> getBookingRoomsByUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        List<BookingRoom> bookingRooms = bookingRoomRepository.findByUser(user);
        return bookingRooms.stream()
                .map(bookingRoomMapper::toBookingRoomResponse)
                .toList();
    }
}
