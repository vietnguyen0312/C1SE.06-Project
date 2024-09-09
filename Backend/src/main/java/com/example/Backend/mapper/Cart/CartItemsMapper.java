package com.example.Backend.mapper.Cart;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.entity.Cart.CartItems;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartItemsMapper {
    CartItems toCartItems(CartItemsCreationRequest request);

    void updateCartItems(@MappingTarget CartItems cartItems, CartItemsUpdateRequest request);

    CartItemsResponse toCartItemsResponse(CartItems cartItems);
}
