package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.request.Room.RoomCreationRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.Room.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingRoomDetailsService {
        BookingRoomDetailsRepository bookingRoomDetailsRepository;
        BookingRoomDetailsMapper bookingRoomDetailsMapper;
        RoomRepository roomRepository;
        BookingRoomRepository bookingRoomRepository;

        public BookingRoomDetailsResponse createBookingRoomDetails(BookingRoomDetailsRequest request) {

                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsMapper.toBookingRoomDetails(request);

                Room room = roomRepository.findById(request.getRoomId())
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

                BookingRoom bookingRoom = bookingRoomRepository.findById(request.getBookingId())
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

                bookingRoomDetails.setRoom(room);
                bookingRoomDetails.setBookingRoom(bookingRoom);
                bookingRoomDetails.setPrice(request.getPrice());

                return bookingRoomDetailsMapper
                                .toBookingRoomDetailsResponse(bookingRoomDetailsRepository.save(bookingRoomDetails));
        }

        public List<BookingRoomDetailsResponse> getAllBookingRoomDetails() {
                List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findAll();
                return bookingRoomDetailsList.stream()
                                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                                .toList();
        }

        public BookingRoomDetailsResponse getBookingRoomDetailsById(String id) {
                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetails);
        }

        @PreAuthorize("hasRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
        public void deleteBookingRoomDetails(String id) {
                if (!bookingRoomDetailsRepository.existsById(id)) {
                        throw new AppException(ErrorCode.NOT_EXISTED);
                }
                bookingRoomDetailsRepository.deleteById(id);
        }

        public List<BookingRoomDetailsResponse> getBookingRoomDetailsByBookingRoom(String bookingRoomId) {
                BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsRepository.findAllByBookingRoom(bookingRoom).stream()
                                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                                .toList();
        }

        @PreAuthorize("hasRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
        public BookingRoomDetailsResponse updateBookingRoomDetails(String id, BookingRoomDetailsRequest request) {
                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

                Room room = roomRepository.findById(request.getRoomId())
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                BookingRoom bookingRoom = bookingRoomRepository.findById(request.getBookingId())
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                bookingRoomDetails.setRoom(room);
                bookingRoomDetails.setBookingRoom(bookingRoom);
                bookingRoomDetails.setPrice(request.getPrice());
                BookingRoomDetails updatedBookingRoomDetails = bookingRoomDetailsRepository.save(bookingRoomDetails);
                return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(updatedBookingRoomDetails);
        }

}
