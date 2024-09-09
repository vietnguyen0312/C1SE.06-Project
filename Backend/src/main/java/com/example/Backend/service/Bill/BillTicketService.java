package com.example.Backend.service.Bill;

import com.example.Backend.dto.request.Bill.BillTicketCreationRequest;
import com.example.Backend.dto.request.Bill.BillTicketUpdateRequest;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketService {
    BillTicketRepository billTicketRepository;
    BillTicketMapper billTicketMapper;
    UserRepository userRepository;

    public BillTicketResponse createBillTicket(BillTicketCreationRequest request) {
        BillTicket billTicket = billTicketMapper.toBillTicket(request);

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    public BillTicketResponse updateBillTicket(BillTicketUpdateRequest request, String id) {
        BillTicket billTicket = billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        billTicketMapper.updateBillTicket(billTicket, request);

        return billTicketMapper.toBillTicketResponse(billTicketRepository.save(billTicket));
    }

    public List<BillTicketResponse> getBillsByUser(String idUser) {
        User user = userRepository.findById(idUser).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return billTicketRepository.findAllByUser(user).stream().map(billTicketMapper::toBillTicketResponse).toList();
    }

    public List<BillTicketResponse> getBills() {
        return billTicketRepository.findAll().stream().map(billTicketMapper::toBillTicketResponse).toList();
    }

    public BillTicketResponse getBill(String id) {
        return billTicketMapper.toBillTicketResponse(billTicketRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }
}
