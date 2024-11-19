package com.example.Backend.repository.Booking;

import com.example.Backend.dto.response.RoomTypeRevenueResponse;
import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;

import com.example.Backend.entity.Room.RoomType;
<<<<<<< Updated upstream
=======
import com.example.Backend.entity.Service.ServiceEntity;
import feign.Param;
>>>>>>> Stashed changes
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
<<<<<<< Updated upstream
import org.springframework.data.repository.query.Param;
=======
>>>>>>> Stashed changes

import java.time.Instant;
import java.util.List;

public interface BookingRoomDetailsRepository extends JpaRepository<BookingRoomDetails, String> {
    List<BookingRoomDetails> findAllByBookingRoom(BookingRoom bookingRoom);

    List<BookingRoomDetails> findByRoom(Room room);

    Page<BookingRoomDetails> findByBookingRoom_User_Email(String email, Pageable pageable);

    List<BookingRoomDetails> findByBookingRoom_Id(String id, Sort sort);

    List<BookingRoomDetails> findByBookingRoom_IdAndRoom_RoomType(String idBookingRoom, RoomType roomType, Sort sort);

    @Query("SELECT new com.example.Backend.dto.response.RoomTypeRevenueResponse(b.room.roomType, SUM(b.price)) " +
            "FROM BookingRoomDetails b " +
            "WHERE b.bookingRoom.checkInDate BETWEEN :startDate AND :endDate " +
            "GROUP BY b.room.roomType " +
            "ORDER BY SUM(b.price) DESC")
    Page<RoomTypeRevenueResponse> findTopRoomTypeByRevenue(
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            Pageable pageable);
    List<BookingRoomDetails> findByCheckOutedIsNullAndCheckInedIsNotNull();

    @Query("SELECT b FROM BookingRoomDetails b " +
            "JOIN b.bookingRoom br " +
            "WHERE " +
            "((b.checkOuted IS NULL AND b.checkIned IS NOT NULL) " +
            "OR (b.checkOuted IS NULL AND br.checkOutDate > CURRENT_TIMESTAMP AND br.checkInDate < CURRENT_TIMESTAMP) " +
            "OR (b.checkOuted IS NULL AND b.checkIned IS NULL AND br.checkOutDate > CURRENT_TIMESTAMP AND br.checkInDate < CURRENT_TIMESTAMP) " +
            "OR (DATE(br.checkInDate) = CURRENT_DATE AND DATE(br.checkOutDate) = CURRENT_DATE))")
    List<BookingRoomDetails> findActiveBookingRoomDetails();


}
