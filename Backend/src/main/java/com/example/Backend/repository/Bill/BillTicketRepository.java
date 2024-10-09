package com.example.Backend.repository.Bill;

import com.example.Backend.entity.Bill.BillTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BillTicketRepository extends JpaRepository<BillTicket, String> {
    Page<BillTicket> findByUser_Email(String email, Pageable pageable);
}
