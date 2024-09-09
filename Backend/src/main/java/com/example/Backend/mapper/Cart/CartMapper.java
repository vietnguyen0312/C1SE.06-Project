package com.example.Backend.mapper.Cart;

import com.example.Backend.dto.request.Cart.CartRequest;
import com.example.Backend.dto.response.Cart.CartResponse;
import com.example.Backend.entity.Cart.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    Cart toCart(CartRequest request);

    CartResponse toCartResponse(Cart cart);
}
