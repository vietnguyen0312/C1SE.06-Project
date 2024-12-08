package com.example.Backend.service.Room;

import com.example.Backend.dto.request.Room.RoomCreationRequest;

import com.example.Backend.dto.request.Room.RoomUpdateRequest;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Room.RoomResponse;

import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Room.RoomMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Room.RoomRepository;
import com.example.Backend.repository.Room.RoomTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomService {
    RoomRepository roomRepository;
    RoomMapper roomMapper;
    RoomTypeRepository roomTypeRepository;
    BookingRoomDetailsRepository bookingRoomDetailsRepository;

    @PreAuthorize("hasRole('MANAGER')")
    public RoomResponse createRoom(RoomCreationRequest request) {
        Room room = roomMapper.toRoom(request);
        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        room.setRoomType(roomType);
        Room savedRoom = roomRepository.save(room);
        return roomMapper.toRoomResponse(savedRoom);
    }

    @PreAuthorize("hasRole('MANAGER')")
    public RoomResponse updateRoom(String id, RoomUpdateRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        room.setStatus(request.getStatus());
        if (request.getRoomTypeId() != null && !request.getRoomTypeId().isEmpty()) {
            RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
            room.setRoomType(roomType);
        }

        Room updatedRoom = roomRepository.save(room);
        return roomMapper.toRoomResponse(updatedRoom);
    }


    public RoomResponse getRoomById(String id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return roomMapper.toRoomResponse(room);
    }

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public List<RoomResponse> getRoomByRoomType(RoomType RoomType) {
        return roomRepository.findAllByRoomType(RoomType).stream().map(roomMapper::toRoomResponse).toList();
    }

    public List<RoomResponse> getAvailableRoomsByRoomType(RoomType roomType) {
        List<Room> rooms = roomRepository.findAllByRoomType(roomType);
        List<Room> availableRooms = rooms.stream()
                .filter(room -> {
                    List<BookingRoomDetails> bookingDetails = bookingRoomDetailsRepository.findByRoom(room);
                    return bookingDetails.stream()
                            .noneMatch(details -> details.getBookingRoom().getCheckOutDate().isAfter(new Date().toInstant()));
                })
                .toList();

        return availableRooms.stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
    }

    public PageResponse<RoomResponse> getAvailableRoomsByRoomType(RoomType roomType, String checkIn, int page, int size) {
        Sort sort = Sort.by("roomNumber").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Room> roomPage = roomRepository.findAllByRoomType(roomType, pageable);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(checkIn, formatter);

        List<Room> availableRooms = roomPage.stream()
                .filter(room -> {
                    List<BookingRoomDetails> bookingDetails = bookingRoomDetailsRepository.findByRoom(room);
                    if (bookingDetails.isEmpty()) {
                        return true;
                    }
                    // Chuyển đổi LocalDate thành Instant
                    Instant checkInInstant = date.atStartOfDay(ZoneId.systemDefault()).toInstant();

                    return bookingDetails.stream()
                            .noneMatch(details ->
                                    details.getBookingRoom().getStatus().equals("đã thanh toán") &&
                                            details.getBookingRoom().getCheckOutDate().compareTo(checkInInstant) >= 0
                            );
                })
                .toList();
        List<RoomResponse> roomResponses = availableRooms.stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
        int totalAvailableRooms = availableRooms.size();
        int totalPages = (int) Math.ceil((double) totalAvailableRooms / size);
        return PageResponse.<RoomResponse>builder()
                .currentPage(page)
                .totalPages(totalPages)
                .pageSize(size)
                .totalElements(totalAvailableRooms)
                .data(roomResponses)
                .build();
    }

    public List<RoomResponse> getAvailableRooms() {
        List<Room> rooms = roomRepository.findAll();
        List<Room> availableRooms = rooms.stream()
                .filter(room -> {
                    List<BookingRoomDetails> bookingDetails = bookingRoomDetailsRepository.findByRoom(room);
                    return bookingDetails.stream()
                            .noneMatch(details -> details.getBookingRoom().getCheckOutDate().isAfter(new Date().toInstant()));
                })
                .toList();
        return availableRooms.stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('MANAGER')")
    public PageResponse<RoomResponse> getAllRoomsSortedByRoomNumber(int page, int size) {
        Sort sort = Sort.by("roomNumber").ascending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<Room> roomPage = roomRepository.findAll(pageable);

        List<RoomResponse> roomResponses = roomPage.getContent().stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());

        return PageResponse.<RoomResponse>builder()
                .currentPage(page)
                .totalPages(roomPage.getTotalPages())
                .pageSize(size)
                .totalElements(roomPage.getTotalElements())
                .data(roomResponses)
                .build();
    }

    public PageResponse<RoomResponse> getAvailableRoomsByRoomType(RoomType roomType, String checkIn, String checkOut, int page, int size) {
        // Sắp xếp phòng theo số phòng giảm dần
        Sort sort = Sort.by("roomNumber").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Room> roomPage = roomRepository.findAllByRoomType(roomType, pageable);

        // Chuyển đổi checkIn và checkOut từ String (dạng ISO 8601) thành Instant
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        Instant checkInInstant = Instant.from(formatter.parse(checkIn));
        Instant checkOutInstant = Instant.from(formatter.parse(checkOut));

        // Tạo danh sách các phòng có sẵn
        List<Room> availableRooms = roomPage.stream()
                .filter(room -> {
                    // Lấy tất cả các thông tin đặt phòng cho phòng này
                    List<BookingRoomDetails> bookingDetails = bookingRoomDetailsRepository.findByRoom(room);
                    // Nếu không có đặt phòng nào, phòng có sẵn
                    if (bookingDetails.isEmpty()) {
                        return true;
                    }

                    // Kiểm tra chồng lấn giữa các đặt phòng đã thanh toán và yêu cầu thời gian check-in/check-out
                    return bookingDetails.stream()
                            .noneMatch(details -> {
                                Instant bookedCheckIn = details.getBookingRoom().getCheckInDate();
                                Instant bookedCheckOut = details.getBookingRoom().getCheckOutDate();

                                // Kiểm tra sự chồng lấn giữa thời gian yêu cầu và thời gian đặt phòng
                                boolean isOverlap = (bookedCheckIn.isBefore(checkOutInstant) && bookedCheckOut.isAfter(checkInInstant));

                                // Nếu có sự chồng lấn và trạng thái đã thanh toán, phòng không có sẵn
                                return details.getBookingRoom().getStatus().equals("đã thanh toán") && isOverlap;
                            });
                })
                .collect(Collectors.toList());

        // Chuyển đổi danh sách phòng thành danh sách RoomResponse
        List<RoomResponse> roomResponses = availableRooms.stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());

        // Tính tổng số phòng có sẵn và số trang
        int totalAvailableRooms = availableRooms.size();
        int totalPages = (int) Math.ceil((double) totalAvailableRooms / size);

        return PageResponse.<RoomResponse>builder()
                .currentPage(page)
                .totalPages(totalPages)
                .pageSize(size)
                .totalElements(totalAvailableRooms)
                .data(roomResponses)
                .build();
    }




}