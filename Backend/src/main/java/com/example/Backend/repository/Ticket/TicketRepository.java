package com.example.Backend.repository.Ticket;

import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findAllByTicketType(TicketType ticketType);
}
