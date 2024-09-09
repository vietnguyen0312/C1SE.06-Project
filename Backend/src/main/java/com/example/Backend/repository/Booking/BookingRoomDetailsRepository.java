package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRoomDetailsRepository extends JpaRepository<BookingRoomDetails, String> {
    List<BookingRoomDetails> findAllByBookingRoom(BookingRoom bookingRoom);
}
