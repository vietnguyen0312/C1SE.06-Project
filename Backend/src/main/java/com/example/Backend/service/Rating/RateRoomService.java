package com.example.Backend.service.Rating;

import com.example.Backend.components.DateTimeFormatter;
import com.example.Backend.dto.request.Rating.RateRoomCreationRequest;
import com.example.Backend.dto.request.Rating.RateRoomUpdateRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Rating.RateRoomResponse;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Rating.RateRoom;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Booking.BookingRoomDetailsMapper;
import com.example.Backend.mapper.Rating.RateRoomMapper;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Rating.RateRoomRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;  // Import đúng Pageable từ Spring Data

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RateRoomService {
    RateRoomRepository rateRoomRepository;
    RateRoomMapper rateRoomMapper;
    UserRepository userRepository;
    BookingRoomDetailsRepository bookingRoomDetailsRepository;
    DateTimeFormatter dateTimeFormatter;

    public RateRoomResponse createRateRoom(RateRoomCreationRequest request) {

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        RateRoom rateRoom = rateRoomMapper.toRateRoom(request);
        BookingRoomDetails bookingRoomDetails = bookingRoomDetailsRepository.findById(request.getBookingRoomDetailsID())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        rateRoom.setBookingRoomDetails(bookingRoomDetails);
        rateRoom.setUser(user);
        return rateRoomMapper.toRateRoomResponse(rateRoomRepository.save(rateRoom));
    }

    public RateRoomResponse updateRateRoom(String id, RateRoomUpdateRequest request) {
        RateRoom rateRoom = rateRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        rateRoomMapper.updateRateRoom(rateRoom, request);
        return rateRoomMapper.toRateRoomResponse(rateRoomRepository.save(rateRoom));
    }

    
    public void deleteRateRoom(String id) {
        if (!rateRoomRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_EXISTED);
        }
        rateRoomRepository.deleteById(id);
    }

//    public List<RateRoomResponse> getRateRoomByRoom(Room room) {
//        return rateRoomRepository.findAllByRoom(room).stream().map(rateRoomMapper::toRateRoomResponse).toList();
//    }

    public  List<RateRoomResponse> getRateRoomByUser()
    {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return rateRoomRepository.findAllByUser(user).stream()
                .map(rateRoomMapper::toRateRoomResponse)
                .toList();
    }

    public PageResponse<RateRoomResponse> getRateRoomByRoomType(String roomTypeID, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "score");
        Pageable pageable = (Pageable) PageRequest.of(page - 1, size, sort);

        Page<RateRoom> rateRoomsPage = rateRoomRepository.findByBookingRoomDetails_Room_RoomType_Id(roomTypeID, pageable);

        List<RateRoomResponse> listData = rateRoomsPage.getContent().stream()
                .map(rateRoom -> {
                    RateRoomResponse response = rateRoomMapper.toRateRoomResponse(rateRoom);
                    response.setCreatedDate(dateTimeFormatter.format(rateRoom.getDateUpdate()));
                    return response;
                })
                .collect(Collectors.toList());

        return PageResponse.<RateRoomResponse>builder()
                .currentPage(page)
                .totalPages(rateRoomsPage.getTotalPages())
                .pageSize(size)
                .totalElements(rateRoomsPage.getTotalElements())
                .data(listData)
                .build();
    }




}
