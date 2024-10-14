package com.example.Backend.service.Cart;

import com.example.Backend.dto.request.Cart.CartItemsCreationRequest;
import com.example.Backend.dto.request.Cart.CartItemsUpdateRequest;
import com.example.Backend.dto.response.Cart.CartItemsResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Cart.CartItems;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.Ticket;
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
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

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
        CartItems cartItems;

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        Ticket ticket = ticketRepository.findById(request.getIdTicket()).orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));

        if (cartItemsRepository.existsByCart_User_EmailAndTicket(email, ticket))
        {
            cartItems = cartItemsRepository.findByCart_User_EmailAndTicket(email, ticket);

            cartItems.setTotal(request.getTotal());

            cartItems.setQuantity(request.getQuantity());
        } else {
            cartItems = cartItemsMapper.toCartItems(request);
            cartItems.setCart(cartRepository.findByUser_Email(email));

            cartItems.setTicket(ticket);
        }

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

    public  List<MapEntryResponse<ServiceResponse,List<CartItemsResponse>>> getMyCartItems() {
        List<MapEntryResponse<ServiceResponse,List<CartItemsResponse>>> cartItemMap = new LinkedList<>();

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        List<CartItems> cartItemsByUser = cartItemsRepository.findByCart_User_Email(email,
                Sort.by(Sort.Direction.ASC, "ticket_serviceEntity_name"));

        List<ServiceEntity> serviceEntities = cartItemsByUser.stream()
                .map(cartItem -> cartItem.getTicket().getServiceEntity())
                .distinct().toList();

        serviceEntities.forEach(serviceEntity -> {
            Sort sort = Sort.by(Sort.Direction.DESC, "ticket_price");
            List<CartItems> cartItems = cartItemsRepository.findByCart_User_EmailAndTicket_ServiceEntity(email, serviceEntity, sort);

            if (!cartItems.isEmpty())
                cartItemMap.add(MapEntryResponse.<ServiceResponse,List<CartItemsResponse>>builder()
                                .key(serviceMapper.toResponse(serviceEntity))
                                .value(cartItems.stream().map(cartItemsMapper::toCartItemsResponse).toList())
                                .build());
        });

        return cartItemMap;
    }
}
