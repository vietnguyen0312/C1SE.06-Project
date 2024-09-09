package com.example.Backend.mapper.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomCreationRequest;
import com.example.Backend.dto.request.Booking.BookingRoomUpdateRequest;
import com.example.Backend.dto.response.Booking.BookingRoomResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookingRoomMapper {
    BookingRoomResponse toBookingRoomResponse(BookingRoom bookingRoom);

    BookingRoom toBookingRoom(BookingRoomCreationRequest bookingRoomRequest);

    void updateBookingRoom(@MappingTarget BookingRoom bookingRoom, BookingRoomUpdateRequest request);
}
