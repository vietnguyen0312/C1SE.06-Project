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

    @Query("SELECT COALESCE(SUM(b.total), 0) FROM BookingRoom b WHERE MONTH(b.checkInDate) = :month AND YEAR(b.checkInDate) = :year")
    Double findSumIncomeByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COALESCE(COUNT(b), 0) FROM BookingRoom b WHERE MONTH(b.checkInDate) = :month AND YEAR(b.checkInDate) = :year")
    int countBillByMonthAndYear(@Param("month") int month, @Param("year") int year);


}
