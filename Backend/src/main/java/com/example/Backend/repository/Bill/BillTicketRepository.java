package com.example.Backend.repository.Bill;

import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;


@Repository
public interface BillTicketRepository extends JpaRepository<BillTicket, String> {
    Page<BillTicket> findByUser_Email(String email, Pageable pageable);
    List<BillTicket> findByDateCreatedBeforeAndStatusIs(Instant dateCreated, String status);
    List<BillTicket> findByUserAndStatus(User user, String status);

    @Query("SELECT COALESCE(SUM(b.total), 0) FROM BillTicket b WHERE MONTH(b.dateCreated) = :month AND YEAR(b.dateCreated) = :year")
    Double findSumIncomeByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COALESCE(COUNT(b), 0) FROM BillTicket b WHERE MONTH(b.dateCreated) = :month AND YEAR(b.dateCreated) = :year")
    int countBillByMonthAndYear(@Param("month") int month, @Param("year") int year);

}
