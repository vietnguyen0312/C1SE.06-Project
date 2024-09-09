package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartRequest;
import com.example.Backend.dto.response.Cart.CartResponse;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.mapper.Cart.CartMapper;
import com.example.Backend.repository.Cart.CartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {
    CartRepository cartRepository;
    CartMapper cartMapper;

    public CartResponse createCart(CartRequest request) {
        Cart cart = cartMapper.toCart(request);

        return cartMapper.toCartResponse(cartRepository.save(cart));
    }
}
