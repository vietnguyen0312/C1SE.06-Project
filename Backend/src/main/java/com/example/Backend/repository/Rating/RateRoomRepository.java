package com.example.Backend.repository.Rating;

import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Rating.RateRoom;

import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RateRoomRepository extends JpaRepository<RateRoom, String> {

    List<RateRoom> findAllByUser(User user);
}
