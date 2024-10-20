package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsRequest;
import com.example.Backend.dto.request.Room.RoomCreationRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.mapper.Room.RoomTypeMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.Room.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingRoomDetailsService {
        BookingRoomDetailsRepository bookingRoomDetailsRepository;
        BookingRoomDetailsMapper bookingRoomDetailsMapper;
        RoomRepository roomRepository;
        BookingRoomRepository bookingRoomRepository;
        RoomTypeMapper roomTypeMapper;

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

        @PostAuthorize("#isCustomer or hasRole('MANAGER')")
        public PageResponse<BookingRoomDetailsResponse> getAllBookingRoomDetails(Boolean isCustomer, int page, int size) {
                Sort sort = Sort.by(Sort.Direction.DESC, "id").ascending();
                Pageable pageable = PageRequest.of(page - 1, size, sort);
                Page<BookingRoomDetails> pageData;

                if (isCustomer)
                {
                        var context = SecurityContextHolder.getContext();
                        String email = context.getAuthentication().getName();

                        pageData = bookingRoomDetailsRepository.findByBookingRoom_User_Email(email, pageable);
                } else {
                        pageData = bookingRoomDetailsRepository.findAll(pageable);
                }

                return PageResponse.<BookingRoomDetailsResponse>builder()
                        .totalPages(pageData.getTotalPages())
                        .pageSize(size)
                        .currentPage(page)
                        .totalElements(pageData.getTotalElements())
                        .data(pageData.stream().map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse).toList())
                        .build();
        }

        public BookingRoomDetailsResponse getBookingRoomDetailsById(String id) {
                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetails);
        }

        @PreAuthorize("hasAnyRole('MANAGER','EMPLOYEE','EMPLOYER')")
        public void deleteBookingRoomDetails(String id) {
                if (!bookingRoomDetailsRepository.existsById(id)) {
                        throw new AppException(ErrorCode.NOT_EXISTED);
                }
                bookingRoomDetailsRepository.deleteById(id);
        }


        public List<BookingRoomDetailsResponse> getBookingRoomDetailsByBookingRoom1(String bookingRoomId) {
                BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsRepository.findAllByBookingRoom(bookingRoom).stream()
                                .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                                .toList();
        }

        @PreAuthorize("hasAnyRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
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

        public List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>> getBookingRoomDetailsByBookingRoom(String bookingRoomId) {
                List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>> bookingRoomDetailsMap = new LinkedList<>();

                // Lấy danh sách chi tiết phòng đã đặt
                List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findByBookingRoom_Id(
                        bookingRoomId, Sort.by(Sort.Direction.DESC, "room_roomType_name"));

                // Sử dụng một Map để nhóm BookingRoomDetails theo RoomType
                Map<RoomType, List<BookingRoomDetails>> roomTypeMap = new HashMap<>();

                for (BookingRoomDetails bookingDetail : bookingRoomDetailsList) {
                        Room room = bookingDetail.getRoom();
                        RoomType roomType = room.getRoomType();

                        // Nếu RoomType chưa có trong Map, thêm vào
                        if (!roomTypeMap.containsKey(roomType)) {
                                roomTypeMap.put(roomType, new ArrayList<>());
                        }

                        // Thêm BookingRoomDetails vào danh sách tương ứng với RoomType
                        roomTypeMap.get(roomType).add(bookingDetail);
                }

                // Chuyển đổi Map thành danh sách kết quả
                roomTypeMap.forEach((roomType, details) -> {
                        bookingRoomDetailsMap.add(
                                MapEntryResponse.<RoomTypeResponse, List<BookingRoomDetails>>builder()
                                        .key(roomTypeMapper.toRoomTypeResponse(roomType))
                                        .value(details)
                                        .build());
                });

                return bookingRoomDetailsMap;
        }


}
