package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Cart.CartItemsMapper;
import com.example.Backend.repository.Cart.CartItemsRepository;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.Ticket.TicketRepository;
import com.example.Backend.repository.Ticket.TicketTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemsService {
    CartItemsRepository cartItemsRepository;
    CartRepository cartRepository;
    TicketRepository ticketRepository;
    TicketTypeRepository ticketTypeRepository;
    CartItemsMapper cartItemsMapper;

    public CartItemsResponse createCartItems(CartItemsCreationRequest request) {
        CartItems cartItems = cartItemsMapper.toCartItems(request);

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        cartItems.setCart(cartRepository.findByUser_Email(email));

        cartItems.setTicket(ticketRepository.findById(request.getIdTicket()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        cartItems.setTicketType(ticketTypeRepository.findById(request.getIdTicketType()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        return cartItemsMapper.toCartItemsResponse(cartItemsRepository.save(cartItems));
    }

    @PreAuthorize("#email == authentication.name")
    public void deleteCartItems(String id,String email) {
        cartItemsRepository.deleteById(id);
    }

    @PostAuthorize("returnObject.cart.user.email == authentication.name or hasRole('MANAGER')")
    public CartItemsResponse updateCartItems(String id, CartItemsUpdateRequest request) {
        CartItems CartItems = cartItemsRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        cartItemsMapper.updateCartItems(CartItems, request);

        return cartItemsMapper.toCartItemsResponse(cartItemsRepository.save(CartItems));
    }

    @PostAuthorize("returnObject.cart.user.email == authentication.name or hasRole('MANAGER')")
    public CartItemsResponse getCartItemsById(String id) {
        return cartItemsMapper.toCartItemsResponse(cartItemsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public List<CartItemsResponse> getMyCartItems() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        return cartItemsRepository.findAllByCart(cartRepository.findByUser_Email(email))
                .stream().map(cartItemsMapper::toCartItemsResponse).toList();
    }
}
