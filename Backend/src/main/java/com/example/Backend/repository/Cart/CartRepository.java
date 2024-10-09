package com.example.Backend.repository.Cart;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findByUser_Email(String email);
}
