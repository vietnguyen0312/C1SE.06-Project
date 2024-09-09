package com.example.Backend.repository.Cart;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.Cart.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, String> {
    List<CartItems> findAllByCart(Cart cart);
}
