package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Cart.CartItemsMapper;
import com.example.Backend.mapper.Service.ServiceMapper;
import com.example.Backend.repository.Cart.CartItemsRepository;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.Ticket.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemsService {
    CartItemsRepository cartItemsRepository;
    CartRepository cartRepository;
    TicketRepository ticketRepository;
    ServiceMapper serviceMapper;
    CartItemsMapper cartItemsMapper;

    public CartItemsResponse createCartItems(CartItemsCreationRequest request) {
        CartItems cartItems = cartItemsMapper.toCartItems(request);

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        cartItems.setCart(cartRepository.findByUser_Email(email));

        cartItems.setTicket(ticketRepository.findById(request.getIdTicket()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

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

    public Map<ServiceResponse,List<CartItemsResponse>> getMyCartItems() {
        Map<ServiceResponse,List<CartItemsResponse>> entityListHashMap = new LinkedHashMap<>();

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        List<CartItems> cartItemsByUser = cartItemsRepository.findByCart_User_Email(email);

        List<ServiceEntity> serviceEntities = cartItemsByUser.stream()
                .map(cartItem -> cartItem.getTicket().getServiceEntity())
                .distinct().toList();

        serviceEntities.forEach(serviceEntity -> {
            List<CartItems> cartItems = cartItemsRepository.findByCart_User_EmailAndTicket_ServiceEntity(email, serviceEntity);
            if (!cartItems.isEmpty())
                entityListHashMap.put(serviceMapper.toResponse(serviceEntity),cartItems.stream().map(cartItemsMapper::toCartItemsResponse).toList());
        });

        return entityListHashMap;
    }
}
