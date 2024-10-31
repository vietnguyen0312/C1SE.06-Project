package com.example.Backend.mapper.Booking;

import com.example.Backend.dto.request.Booking.BookingRoomDetailsCreationRequest;
import com.example.Backend.dto.response.Booking.BookingRoomDetailsResponse;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingRoomDetailsMapper {
    BookingRoomDetailsResponse toBookingRoomDetailsResponse(BookingRoomDetails bookingRoomDetails);

    BookingRoomDetails toBookingRoomDetails(BookingRoomDetailsCreationRequest bookingRoomDetailsCreationRequest);
}
