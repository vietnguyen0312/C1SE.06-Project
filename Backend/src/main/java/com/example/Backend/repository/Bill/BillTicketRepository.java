package com.example.Backend.repository.Bill;

import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillTicketRepository extends JpaRepository<BillTicket, String> {
    List<BillTicket> findAllByUser(User user);
}
