package com.example.Backend.repository.Ticket;

import com.example.Backend.entity.Ticket.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findByServiceEntity_NameContainingOrServiceEntity_DescriptionContaining
            (String name, String description);
}
