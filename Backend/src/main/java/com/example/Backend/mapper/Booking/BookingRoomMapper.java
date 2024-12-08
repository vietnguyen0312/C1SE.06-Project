package com.example.Backend.mapper.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomCreationByStaffRequest;
import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.User.User;
import com.example.Backend.repository.User.UserRepository;
import com.example.Backend.service.User.UserService;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BookingRoomMapper {
    BookingRoomResponse toBookingRoomResponse(BookingRoom bookingRoom);

    BookingRoom toBookingRoom(BookingRoomCreationRequest bookingRoomRequest);

    void updateBookingRoom(@MappingTarget BookingRoom bookingRoom, BookingRoomUpdateRequest request);


}
