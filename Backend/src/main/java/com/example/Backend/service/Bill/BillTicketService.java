package com.example.Backend.service.Bill;

import com.example.Backend.dto.request.Bill.BillTicketCreationRequest;
import com.example.Backend.dto.request.Bill.BillTicketUpdateRequest;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Bill.BillTicketMapper;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketService {
    BillTicketRepository billTicketRepository;
    BillTicketMapper billTicketMapper;

    public BillTicketResponse createBillTicket(BillTicketCreationRequest request) {
        BillTicket billTicket = billTicketMapper.toBillTicket(request);

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public BillTicketResponse updateBillTicket(BillTicketUpdateRequest request, String id) {
        BillTicket billTicket = billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        billTicketMapper.updateBillTicket(billTicket, request);

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    @PostAuthorize("returnObject.user.email == authentication.name or hasRole('MANAGER')")
    public PageResponse<BillTicketResponse> getBills(Boolean isCustomer, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "datePay").ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<BillTicket> pageData;

        if (isCustomer)
        {
            var context = SecurityContextHolder.getContext();
            String email = context.getAuthentication().getName();

            pageData = billTicketRepository.findByUser_Email(email, pageable);
        } else {
            pageData = billTicketRepository.findAll(pageable);
        }

        return PageResponse.<BillTicketResponse>builder()
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream().map(billTicketMapper::toBillTicketResponse).toList())
                .build();
    }

    @PreAuthorize("hasRole('MANAGER')")
    public BillTicketResponse getBill(String id) {
        return billTicketMapper.toBillTicketResponse(billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }
}
