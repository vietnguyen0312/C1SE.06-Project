package com.example.Backend.service.Bill;

import com.example.Backend.dto.request.Bill.BillTicketCreationRequest;
import com.example.Backend.dto.request.Bill.BillTicketUpdateRequest;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.RoleEnum;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketService {
    BillTicketRepository billTicketRepository;
    UserRepository userRepository;
    BillTicketMapper billTicketMapper;

    public BillTicketResponse createBillTicket(BillTicketCreationRequest request) {
        BillTicket billTicket = billTicketMapper.toBillTicket(request);

        User user;

        if (request.getUser() == null)
        {
            var context = SecurityContextHolder.getContext();
            String email = context.getAuthentication().getName();

            user = userRepository.findByEmail(email).orElseThrow(
                    () -> new AppException(ErrorCode.NOT_EXISTED));
        } else {
            user = request.getUser();
        }

        billTicket.setUser(user);

        billTicket.setDateCreated(Instant.now());

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    public BillTicketResponse updateBillTicket(BillTicketUpdateRequest request, String id) {
        BillTicket billTicket = billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        billTicketMapper.updateBillTicket(billTicket, request);

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    public PageResponse<BillTicketResponse> getBills(int page, int size, String search) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateCreated");

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<BillTicket> pageData;

        var context = SecurityContextHolder.getContext();
        var isEmployee = context.getAuthentication().getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(RoleEnum.ROLE_EMPLOYEE.name()));

        if (isEmployee)
        {
            if (StringUtils.hasLength(search))
                pageData = billTicketRepository.findByIdContaining(search, pageable);
            else
                pageData = billTicketRepository.findAll(pageable);
        } else {
            String email = context.getAuthentication().getName();

            pageData = billTicketRepository.findByUser_Email(email, pageable);
        }

        return PageResponse.<BillTicketResponse>builder()
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream().map(billTicketMapper::toBillTicketResponse).toList())
                .build();
    }

    @PostAuthorize("returnObject.user.email == authentication.name or hasRole('EMPLOYEE')")
    public BillTicketResponse getBill(String id) {
        return billTicketMapper.toBillTicketResponse(billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }
}
