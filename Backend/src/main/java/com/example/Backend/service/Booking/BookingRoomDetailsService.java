package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingRoomDetailsService {
    BookingRoomDetailsRepository bookingRoomDetailsRepository;
    BookingRoomDetailsMapper bookingRoomDetailsMapper;

    public BookingRoomDetailsResponse createBookingRoomDetails(BookingRoomDetailsRequest request) {
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsMapper.toBookingRoomDetails(request);
        return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetailsRepository.save(bookingRoomDetails));
    }

    public List<BookingRoomDetailsResponse> getAllBookingRoomDetails() {
        List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findAll();
        return bookingRoomDetailsList.stream()
                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                .toList();
    }

    public BookingRoomDetailsResponse getBookingRoomDetails(String id) {
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetails);
    }

    public void deleteBookingRoomDetails(String id) {
        if (!bookingRoomDetailsRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_EXISTED);
        }
        bookingRoomDetailsRepository.deleteById(id);
    }

    public List<BookingRoomDetailsResponse> getBookingRoomDetailsByBookingRoom(BookingRoom bookingRoom) {
        return bookingRoomDetailsRepository.findAllByBookingRoom(bookingRoom).stream().map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse).toList();
    }
}
