package com.example.Backend.controller;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.service.Cart.CartItemsService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @GetMapping
    ApiResponse<Map<ServiceResponse,List<CartItemsResponse>>> getMyCartItems() {
        return ApiResponse.<Map<ServiceResponse,List<CartItemsResponse>>>builder()
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
