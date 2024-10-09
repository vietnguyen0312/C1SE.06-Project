package com.example.Backend.controller;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.entity.User.User;
import com.example.Backend.service.Cart.CartItemsService;
import com.example.Backend.service.User.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/cart-items")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemController {
    CartItemsService cartItemsService;

    @PostMapping
    ApiResponse<CartItemsResponse> createCartItem(@RequestBody @Valid CartItemsCreationRequest request) {
        return ApiResponse.<CartItemsResponse>builder()
                .result(cartItemsService.createCartItems(request))
                .build();
    }
    @GetMapping("/{id}")
    ApiResponse<CartItemsResponse> getCartItemById(@PathVariable("id")String id) {
        return ApiResponse.<CartItemsResponse>builder()
                .result(cartItemsService.getCartItemsById(id))
                .build();
    }
    @GetMapping
    ApiResponse<List<CartItemsResponse>> getMyCartItems() {
        return ApiResponse.<List<CartItemsResponse>>builder()
                .result(cartItemsService.getMyCartItems())
                .build();
    }
    @PutMapping("/{id}")
    ApiResponse<CartItemsResponse> updateCartItems(@RequestBody @Valid CartItemsUpdateRequest request
            , @PathVariable("id")String id) {
        return ApiResponse.<CartItemsResponse>builder()
                .result(cartItemsService.updateCartItems(id, request))
                .build();
    }
    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteCartItems(@PathVariable("id")String id){
        CartItemsResponse cartItemsResponse = cartItemsService.getCartItemsById(id);
        cartItemsService.deleteCartItems(id, cartItemsResponse.getCart().getUser().getEmail());
        return ApiResponse.<Void>builder().build();
    }
}
