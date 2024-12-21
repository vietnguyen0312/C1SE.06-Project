package com.example.Backend.service.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDeTailsUpdateRequest;
import com.example.Backend.dto.request.Booking.BookingRoomDetailsCreationRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Room.RoomTypeResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.mapper.Booking.BookingRoomMapper;
import com.example.Backend.mapper.Room.RoomTypeMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import com.example.Backend.repository.Room.RoomRepository;
import com.example.Backend.repository.User.UserRepository;
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

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

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
        BookingRoomMapper bookingRoomMapper;
        UserRepository userRepository;

        public BookingRoomDetailsResponse createBookingRoomDetails(BookingRoomDetailsCreationRequest request) {
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
        @PostAuthorize("returnObject.bookingRoom.user.email == authentication.name or hasRole('MANAGER')")
        public BookingRoomDetailsResponse getBookingRoomDetailsById(String id) {
                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(bookingRoomDetails);
        }

        @PreAuthorize("hasRole('MANAGER')")
        public void deleteBookingRoomDetails(String id) {
                if (!bookingRoomDetailsRepository.existsById(id)) {
                        throw new AppException(ErrorCode.NOT_EXISTED);
                }
                bookingRoomDetailsRepository.deleteById(id);
        }

        @PreAuthorize("hasRole('MANAGER')")
        public List<BookingRoomDetailsResponse> getBookingRoomDetailsByBookingRoom1(String bookingRoomId) {
                BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
                return bookingRoomDetailsRepository.findAllByBookingRoom(bookingRoom).stream()
                        .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                        .toList();
        }
        @PreAuthorize("hasRole('MANAGER')")
        public BookingRoomDetailsResponse updateBookingRoomDetails(String id, BookingRoomDeTailsUpdateRequest request) {

                BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

                
                bookingRoomDetails.setCheckIned(request.getCheckIned());
                bookingRoomDetails.setCheckOuted(request.getCheckOuted());

                BookingRoomDetails updatedBookingRoomDetails = bookingRoomDetailsRepository.save(bookingRoomDetails);

                return bookingRoomDetailsMapper.toBookingRoomDetailsResponse(updatedBookingRoomDetails);
        }



        //        @PreAuthorize("hasRole('MANAGER')")
        public List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>> getBookingRoomDetailsByBookingRoom(String bookingRoomId) {
                List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetails>>> bookingRoomDetailsMap = new LinkedList<>();

                List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findByBookingRoom_Id(
                        bookingRoomId, Sort.by(Sort.Direction.DESC, "room_roomType_name"));

                Map<RoomType, List<BookingRoomDetails>> roomTypeMap = new HashMap<>();

                for (BookingRoomDetails bookingDetail : bookingRoomDetailsList) {
                        Room room = bookingDetail.getRoom();
                        RoomType roomType = room.getRoomType();

                        if (!roomTypeMap.containsKey(roomType)) {
                                roomTypeMap.put(roomType, new ArrayList<>());
                        }

                        roomTypeMap.get(roomType).add(bookingDetail);
                }

                roomTypeMap.forEach((roomType, details) -> {
                        bookingRoomDetailsMap.add(
                                MapEntryResponse.<RoomTypeResponse, List<BookingRoomDetails>>builder()
                                        .key(roomTypeMapper.toRoomTypeResponse(roomType))
                                        .value(details)
                                        .build());
                });

                return bookingRoomDetailsMap;
        }



        public List<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>
        getBookingRoomDetailsByUserID() {

                var context = SecurityContextHolder.getContext();
                String email = context.getAuthentication().getName();

                List<BookingRoom> bookingRooms = bookingRoomRepository.findByUser_Email(email, Sort.by(Sort.Direction.DESC, "datePay"));

                Map<Instant, List<BookingRoom>> bookingRoomMap = bookingRooms.stream()
                        .collect(Collectors.groupingBy(BookingRoom::getDatePay, LinkedHashMap::new, Collectors.toList()));

                // Sắp xếp bookingRoomMap theo khóa (Instant) giảm dần
                Map<Instant, List<BookingRoom>> sortedBookingRoomMap = bookingRoomMap.entrySet().stream()
                        .sorted(Map.Entry.<Instant, List<BookingRoom>>comparingByKey().reversed())
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                Map.Entry::getValue,
                                (oldValue, newValue) -> oldValue,
                                LinkedHashMap::new
                        ));

                List<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>
                        bookingRoomDetailsMap = new ArrayList<>();

                for (Map.Entry<Instant, List<BookingRoom>> entry : sortedBookingRoomMap.entrySet()) {
                        Instant payDate = entry.getKey();
                        List<BookingRoom> rooms = entry.getValue();

                        List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>> bookingRoomEntries = new ArrayList<>();

                        for (BookingRoom bookingRoom : rooms) {
                                List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findByBookingRoom_Id(
                                        bookingRoom.getId(), Sort.by(Sort.Direction.DESC, "room.roomType.name"));

                                Map<RoomType, List<BookingRoomDetails>> roomTypeMap = bookingRoomDetailsList.stream()
                                        .collect(Collectors.groupingBy(bd -> bd.getRoom().getRoomType()));

                                List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>> roomTypeResponses = roomTypeMap.entrySet().stream()
                                        .map(roomTypeEntry -> {
                                                RoomType roomType = roomTypeEntry.getKey();
                                                List<BookingRoomDetails> details = roomTypeEntry.getValue();

                                                RoomTypeResponse roomTypeResponse = roomTypeMapper.toRoomTypeResponse(roomType);
                                                List<BookingRoomDetailsResponse> bookingRoomDetailsResponses = details.stream()
                                                        .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                                                        .collect(Collectors.toList());

                                                return MapEntryResponse.<RoomTypeResponse, List<BookingRoomDetailsResponse>>builder()
                                                        .key(roomTypeResponse)
                                                        .value(bookingRoomDetailsResponses)
                                                        .build();
                                        })
                                        .collect(Collectors.toList());

                                BookingRoomResponse bookingRoomResponse = bookingRoomMapper.toBookingRoomResponse(bookingRoom);
                                bookingRoomEntries.add(
                                        MapEntryResponse.<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>builder()
                                                .key(bookingRoomResponse)
                                                .value(roomTypeResponses)
                                                .build()
                                );
                        }

                        bookingRoomDetailsMap.add(
                                MapEntryResponse.<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>builder()
                                        .key(payDate)
                                        .value(bookingRoomEntries)
                                        .build()
                        );
                }

                return bookingRoomDetailsMap;
        }

        public PageResponse<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>
        getBookingRoomDetailsByUserID1( int page, int size) {

                var context = SecurityContextHolder.getContext();
                String email = context.getAuthentication().getName();

                List<BookingRoom> bookingRooms = bookingRoomRepository.findByUser_Email(email, Sort.by(Sort.Direction.DESC, "datePay"));

                Map<Instant, List<BookingRoom>> bookingRoomMap = bookingRooms.stream()
                        .collect(Collectors.groupingBy(BookingRoom::getDatePay, LinkedHashMap::new, Collectors.toList()));

                Map<Instant, List<BookingRoom>> sortedBookingRoomMap = bookingRoomMap.entrySet().stream()
                        .sorted(Map.Entry.<Instant, List<BookingRoom>>comparingByKey().reversed())
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                Map.Entry::getValue,
                                (oldValue, newValue) -> oldValue,
                                LinkedHashMap::new
                        ));

                List<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>
                        bookingRoomDetailsMap = new ArrayList<>();

                for (Map.Entry<Instant, List<BookingRoom>> entry : sortedBookingRoomMap.entrySet()) {
                        Instant payDate = entry.getKey();
                        List<BookingRoom> rooms = entry.getValue();

                        List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>> bookingRoomEntries = new ArrayList<>();

                        for (BookingRoom bookingRoom : rooms) {
                                List<BookingRoomDetails> bookingRoomDetailsList = bookingRoomDetailsRepository.findByBookingRoom_Id(
                                        bookingRoom.getId(), Sort.by(Sort.Direction.DESC, "room.roomType.name"));

                                Map<RoomType, List<BookingRoomDetails>> roomTypeMap = bookingRoomDetailsList.stream()
                                        .collect(Collectors.groupingBy(bd -> bd.getRoom().getRoomType()));

                                List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>> roomTypeResponses = roomTypeMap.entrySet().stream()
                                        .map(roomTypeEntry -> {
                                                RoomType roomType = roomTypeEntry.getKey();
                                                List<BookingRoomDetails> details = roomTypeEntry.getValue();

                                                RoomTypeResponse roomTypeResponse = roomTypeMapper.toRoomTypeResponse(roomType);
                                                List<BookingRoomDetailsResponse> bookingRoomDetailsResponses = details.stream()
                                                        .map(bookingRoomDetailsMapper::toBookingRoomDetailsResponse)
                                                        .collect(Collectors.toList());

                                                return MapEntryResponse.<RoomTypeResponse, List<BookingRoomDetailsResponse>>builder()
                                                        .key(roomTypeResponse)
                                                        .value(bookingRoomDetailsResponses)
                                                        .build();
                                        })
                                        .collect(Collectors.toList());

                                BookingRoomResponse bookingRoomResponse = bookingRoomMapper.toBookingRoomResponse(bookingRoom);
                                bookingRoomEntries.add(
                                        MapEntryResponse.<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>builder()
                                                .key(bookingRoomResponse)
                                                .value(roomTypeResponses)
                                                .build()
                                );
                        }

                        bookingRoomDetailsMap.add(
                                MapEntryResponse.<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>builder()
                                        .key(payDate)
                                        .value(bookingRoomEntries)
                                        .build()
                        );
                }

                int totalElements = bookingRoomDetailsMap.size();
                int totalPages = (int) Math.ceil((double) totalElements / size);
                int fromIndex = Math.min((page - 1) * size, totalElements);
                int toIndex = Math.min(fromIndex + size, totalElements);

                List<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>
                        paginatedResults = bookingRoomDetailsMap.subList(fromIndex, toIndex);

                return PageResponse.<MapEntryResponse<Instant, List<MapEntryResponse<BookingRoomResponse, List<MapEntryResponse<RoomTypeResponse, List<BookingRoomDetailsResponse>>>>>>>builder()
                        .currentPage(page)
                        .totalPages(totalPages)
                        .pageSize(size)
                        .totalElements(totalElements)
                        .data(paginatedResults)
                        .build();
        }




        @PreAuthorize("hasRole('MANAGER')")
        public List<BookingRoomDetails> getActiveBookingRoomDetails() {
                return bookingRoomDetailsRepository.findActiveBookingRoomDetails();
        }

        @PreAuthorize("hasRole('MANAGER')")
        public List<BookingRoomDetails> getBookingRoomDetailsByRoomId(String roomId) {
                // Sắp xếp theo checkInDate của BookingRoom
                Sort sort = Sort.by(Sort.Order.asc("bookingRoom.checkInDate"));
                return bookingRoomDetailsRepository.findByRoom_Id(roomId, sort);
        }

        @PreAuthorize("hasRole('MANAGER')")
        public List<BookingRoomDetails> getBookingRoomDetailsByBookingRoomStaff(String bookingRoomId) {
                return bookingRoomDetailsRepository.findByBookingRoom_id(bookingRoomId);
        }

        @PreAuthorize("hasRole('MANAGER')")
        public List<BookingRoomDetails> getBookingRoomDetailsByBookingRoomStaff1(String phoneNumber) {
                return bookingRoomDetailsRepository.findByBookingRoom_User_phoneNumber(phoneNumber);
        }


}
