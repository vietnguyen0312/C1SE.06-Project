package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, String> {
    List<BookingRoom> findByUser(User user);
    Page<BookingRoom> findByUser_Email(String email, Pageable pageable);
}
