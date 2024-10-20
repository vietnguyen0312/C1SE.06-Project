package com.example.Backend.repository.Cart;

import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.Ticket;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, String> {
    List<CartItems> findByCart_User_Email(String email, Sort sort);

    List<CartItems> findByCart_User_EmailAndTicket_ServiceEntity(String email, ServiceEntity serviceEntity, Sort sort);

    boolean existsByCart_User_EmailAndTicket(String email, Ticket ticket);

    CartItems findByCart_User_EmailAndTicket(String email, Ticket ticket);
}
