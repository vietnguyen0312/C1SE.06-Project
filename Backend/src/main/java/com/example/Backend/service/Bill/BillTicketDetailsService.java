package com.example.Backend.service.Bill;

import com.example.Backend.dto.request.Bill.BillTicketDetailsRequest;
import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Bill.BillTicketDetailsMapper;
import com.example.Backend.repository.Bill.BillTicketDetailsRepository;
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
public class BillTicketDetailsService {
    BillTicketDetailsRepository billTicketDetailsRepository;
    BillTicketDetailsMapper billTicketDetailsMapper;

    public BillTicketDetailsResponse createBillTicketDetails(BillTicketDetailsRequest request) {
        BillTicketDetails billTicketDetails = billTicketDetailsMapper.toBillTicketDetails(request);

        return billTicketDetailsMapper.toBillTicketDetailsResponse(billTicketDetailsRepository.save(billTicketDetails));
    }

    public BillTicketDetailsResponse getBillTicketDetailsById(String id) {
        return billTicketDetailsMapper.toBillTicketDetailsResponse(billTicketDetailsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public List<BillTicketDetailsResponse> getBillTicketDetailsByBillTicket(BillTicket billTicket) {
        return billTicketDetailsRepository.findAllByBillTicket(billTicket).stream().map(billTicketDetailsMapper::toBillTicketDetailsResponse).toList();
    }
}
