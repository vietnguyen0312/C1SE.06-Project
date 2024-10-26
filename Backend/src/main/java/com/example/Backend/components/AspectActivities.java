package com.example.Backend.components;

import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.entity.User.CustomerType;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.CustomerTypeEnum;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.repository.Bill.BillTicketDetailsRepository;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.Ticket.TicketRepository;
import com.example.Backend.repository.User.CustomerTypeRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AspectActivities {
    CartRepository cartRepository;
    BillTicketRepository billTicketRepository;
    BillTicketDetailsRepository billTicketDetailsRepository;
    TicketRepository ticketRepository;
    UserRepository userRepository;
    CustomerTypeRepository customerTypeRepository;

    @AfterReturning(value = "execution(* com.example.Backend.service.User.UserService.createUser(..))", returning = "userResponse")
    public void afterUserCreated(UserResponse userResponse) {
        try {
            cartRepository.save(Cart.builder()
                    .user(userRepository.findById(userResponse.getId())
                            .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)))
                    .build());
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.EXISTED);
        }
    }

    @AfterReturning(value = "execution(* com.example.Backend.service.Bill.BillTicketDetailsService.createBillTicketDetails(..))",
            returning = "billTicketDetailsResponse")
    public void afterBillDetailsCreated(BillTicketDetailsResponse billTicketDetailsResponse) {
        log.info("createBillTicketDetails");
        updateTicketQuantity(billTicketDetailsResponse.getTicket(), -billTicketDetailsResponse.getQuantity());
    }

    @AfterReturning(value = "execution(* com.example.Backend.repository.Bill.BillTicketRepository.save(..))", returning = "billTicket")
    public void afterBillSaved(BillTicket billTicket) {
        log.info("afterBillSaved");
        if ("Đã huỷ".equals(billTicket.getStatus()))
        {
            List<BillTicketDetails> billTicketDetailsList = billTicketDetailsRepository.findByBillTicket_Id(billTicket.getId());
            billTicketDetailsList.forEach(billTicketDetails -> {
                updateTicketQuantity(billTicketDetails.getTicket(), billTicketDetails.getQuantity());
            });
        } else if ("Đã thanh toán".equals(billTicket.getStatus())) {
            double totalPaid = billTicketRepository.findByUserAndStatus(billTicket.getUser(), "Đã thanh toán").stream()
                    .mapToDouble(BillTicket::getTotal)
                    .sum();
            updateCustomerType(billTicket.getUser(), totalPaid);
        }

    }

    private void updateTicketQuantity(Ticket ticket, int quantityChange) {
        ticket.setQuantity(ticket.getQuantity() + quantityChange);
        ticketRepository.save(ticket);
    }

    private void updateCustomerType(User user, double totalPaid) {
        CustomerType customerType = null;
        if (totalPaid >= 5000000) {
            customerType = customerTypeRepository.findByName(CustomerTypeEnum.GOLD.getName());
        } else if (totalPaid >= 1000000) {
            customerType = customerTypeRepository.findByName(CustomerTypeEnum.SILVER.getName());
        }
        if (customerType != null) {
            user.setCustomerType(customerType);
            userRepository.save(user);
        }
    }
}
