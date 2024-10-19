package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;

import com.example.Backend.entity.Room.RoomType;
import com.example.Backend.entity.Service.ServiceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRoomDetailsRepository extends JpaRepository<BookingRoomDetails, String> {
    List<BookingRoomDetails> findAllByBookingRoom(BookingRoom bookingRoom);

    List<BookingRoomDetails> findByRoom(Room room);

    Page<BookingRoomDetails> findByBookingRoom_User_Email(String email, Pageable pageable);

    List<BookingRoomDetails> findByBookingRoom_Id(String id, Sort sort);

    List<BookingRoomDetails> findByBookingRoom_IdAndRoom_RoomType(String idBookingRoom, RoomType roomType, Sort sort);
}
