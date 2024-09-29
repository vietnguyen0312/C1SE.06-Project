package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRoomDetailsRepository extends JpaRepository<BookingRoomDetails, String> {
    List<BookingRoomDetails> findAllByBookingRoom(BookingRoom bookingRoom);

    List<BookingRoomDetails> findByRoom(Room room);
}
