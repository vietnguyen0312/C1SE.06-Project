package com.example.Backend.repository.Cart;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findByUser(User user);
}
