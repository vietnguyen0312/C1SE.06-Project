package com.example.Backend.repository.Booking;

import com.example.Backend.entity.Booking.BookingRoom;
import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, String> {
    List<BookingRoom> findByUser(User user);
    Page<BookingRoom> findByUser_Email(String email, Pageable pageable);
    List<BookingRoom> findByUser_Email(String email, Sort sort);
    List<BookingRoom> findByDatePayBeforeAndStatusIs(Instant datePay, String status);

    @Query("SELECT SUM(b.total) FROM BookingRoom b WHERE MONTH(b.checkInDate) = :month")
    Double findSumIncomeByMonth(@Param("month") int month);

    @Query("SELECT COUNT(b) FROM BookingRoom b WHERE MONTH(b.checkInDate) = :month")
    int countBillByMonth(@Param("month") int month);

}
