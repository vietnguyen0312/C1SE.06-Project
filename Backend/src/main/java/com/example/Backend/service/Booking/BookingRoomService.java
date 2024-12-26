package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomCreationByStaffRequest;
import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Room.RoomResponse;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Bill.BillTicket;
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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    SimpMessagingTemplate messagingTemplate;

    public BookingRoomResponse createBookingRoom(BookingRoomCreationRequest request) {
        BookingRoom bookingRoom = bookingRoomMapper.toBookingRoom(request);
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        bookingRoom.setUser(user);
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public BookingRoomResponse createBookingRoomByStaff(BookingRoomCreationByStaffRequest request) {

        BookingRoomCreationRequest creationRequest = BookingRoomCreationRequest.builder()
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .total(request.getTotal())
                .datePay(request.getDatePay())
                .status(request.getStatus())
                .build();

        BookingRoom bookingRoom = bookingRoomMapper.toBookingRoom(creationRequest);

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        // Tìm nhân viên theo email
        User staff = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        bookingRoom.setStaffBooker(staff);

        String userId = request.getUser();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        bookingRoom.setUser(user);

        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }


    @PostAuthorize("#isCustomer or hasRole('EMPLOYEE')")
    public PageResponse<BookingRoomResponse> getBookingRooms(Boolean isCustomer, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "checkInDate");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<BookingRoom> pageData;

        if (isCustomer)
        {
            var context = SecurityContextHolder.getContext();
            String email = context.getAuthentication().getName();

            pageData = bookingRoomRepository.findByUser_Email(email, pageable);
        } else {
            pageData = bookingRoomRepository.findAll(pageable);
        }

        return PageResponse.<BookingRoomResponse>builder()
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream().map(bookingRoomMapper::toBookingRoomResponse).toList())
                .build();
    }

    @PostAuthorize("returnObject.user.email == authentication.name or hasRole('EMPLOYEE')")
    public BookingRoomResponse getBookingRoomById(String id) {
        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }



    @PostAuthorize("returnObject.user.email == authentication.name or hasRole('EMPLOYEE')")
    public BookingRoomResponse updateBookingRoom(String id, BookingRoomUpdateRequest request) {

        BookingRoom bookingRoom = bookingRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        bookingRoomMapper.updateBookingRoom(bookingRoom, request);

        if(request.getStatus().equals("đã thanh toán")) {
            messagingTemplate.convertAndSend("/topic/room-updates", id);
        }

        return bookingRoomMapper.toBookingRoomResponse(bookingRoomRepository.save(bookingRoom));
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    public void deleteBookingRoom(String id) {
        bookingRoomRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<BookingRoomResponse> getBookingRoomsByUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        List<BookingRoom> bookingRooms = bookingRoomRepository.findByUser(user);
        return bookingRooms.stream()
                .map(bookingRoomMapper::toBookingRoomResponse)
                .toList();
    }


}
