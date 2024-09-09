package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, String> {

}
