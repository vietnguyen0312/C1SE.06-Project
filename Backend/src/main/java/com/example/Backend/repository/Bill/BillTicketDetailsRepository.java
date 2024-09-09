package com.example.Backend.repository.Bill;

import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.Bill.BillTicketDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillTicketDetailsRepository extends JpaRepository<BillTicketDetails, String> {
    List<BillTicketDetails> findAllByBillTicket(BillTicket billTicket);
}
