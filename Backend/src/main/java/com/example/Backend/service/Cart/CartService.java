package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartRequest;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.User.UserRepository;
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
    UserRepository userRepository;

    public void createCart(CartRequest request) {

        cartRepository.save(Cart.builder()
                .user(userRepository.findById(request.getUserId())
                        .orElseThrow(()->new AppException(ErrorCode.NOT_EXISTED)))
                .build());
    }
}
