package com.example.Backend.repository.Ticket;

import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.Ticket;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findByServiceEntity_NameContainingAndServiceEntityIsOrServiceEntity_DescriptionContainingAndServiceEntityIs
            (String name, ServiceEntity serviceEntity1, String description, ServiceEntity serviceEntity2, Sort sort);

    List<Ticket> findByServiceEntityIs(ServiceEntity serviceEntity1, Sort sort);
}
