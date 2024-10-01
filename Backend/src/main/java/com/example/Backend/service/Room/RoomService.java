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
        try {

            Room room = roomMapper.toRoom(request);

            RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
            room.setRoomType(roomType);

            Room savedRoom = roomRepository.save(room);
            return roomMapper.toRoomResponse(savedRoom);
        } catch (Exception e) {

            throw new AppException(ErrorCode.EXISTED);
        }
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

    @PreAuthorize("hasRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
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

    @PreAuthorize("hasRole('MANAGER','EMPLOYEE' ,'EMPLOYER')")
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
                            .noneMatch(details -> details.getBookingRoom().getCheckOutDate().after(new Date()));
                })
                .collect(Collectors.toList());

        return availableRooms.stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
    }

    public PageResponse<RoomResponse> getAvailableRoomsByRoomType(RoomType roomType, Date checkIn, int page, int size) {
        Sort sort = Sort.by("roomNumber").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Room> roomPage = roomRepository.findAllByRoomType(roomType, pageable);
        List<Room> availableRooms = roomPage.stream()
                .filter(room -> {
                    List<BookingRoomDetails> bookingDetails = bookingRoomDetailsRepository.findByRoom(room);
                    if (bookingDetails.isEmpty()) {
                        return true;
                    }
                    return bookingDetails.stream()
                            .noneMatch(details -> details.getBookingRoom().getCheckOutDate().compareTo(checkIn) >= 0);
                })
                .collect(Collectors.toList());
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

}