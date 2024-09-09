package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Cart.CartItemsMapper;
import com.example.Backend.repository.Cart.CartItemsRepository;
import com.example.Backend.repository.Cart.CartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemsService {
    CartItemsRepository CartItemsRepository;
    CartRepository cartRepository;
    CartItemsMapper CartItemsMapper;

    public CartItemsResponse createCartItems(CartItemsCreationRequest request) {
        CartItems CartItems = CartItemsMapper.toCartItems(request);

        return CartItemsMapper.toCartItemsResponse(CartItemsRepository.save(CartItems));
    }

    public void deleteCartItems(String id) {
        CartItemsRepository.deleteById(id);
    }

    public CartItemsResponse updateCartItems(String id, CartItemsUpdateRequest request) {
        CartItems CartItems = CartItemsRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        CartItemsMapper.updateCartItems(CartItems, request);

        return CartItemsMapper.toCartItemsResponse(CartItemsRepository.save(CartItems));
    }

    public CartItemsResponse getCartItemsById(String id) {
        return CartItemsMapper.toCartItemsResponse(CartItemsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public List<CartItemsResponse> getCartItemsByUser(User user) {
        Cart cart = cartRepository.findByUser(user);
        return CartItemsRepository.findAllByCart(cart).stream().map(CartItemsMapper::toCartItemsResponse).toList();
    }
}
