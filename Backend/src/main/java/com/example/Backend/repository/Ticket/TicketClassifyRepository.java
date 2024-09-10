package com.example.Backend.repository.Ticket;

import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.Ticket.TicketClassify;
import com.example.Backend.entity.Ticket.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketClassifyRepository extends JpaRepository<TicketClassify,String> {
    List<TicketClassify> findAllByTicketType(TicketType ticketType);
}
