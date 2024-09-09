package com.example.Backend.repository.Ticket;

import com.example.Backend.entity.Ticket.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, String> {
    boolean existsByName(String name);
}
