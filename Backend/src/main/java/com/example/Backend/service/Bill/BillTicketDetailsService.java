package com.example.Backend.service.Bill;

import com.example.Backend.dto.request.Bill.BillTicketDetailsRequest;
import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Ticket.Ticket;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.mapper.Bill.BillTicketDetailsMapper;
import com.example.Backend.mapper.Service.ServiceMapper;
import com.example.Backend.repository.Bill.BillTicketDetailsRepository;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.Ticket.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BillTicketDetailsService {
    BillTicketDetailsRepository billTicketDetailsRepository;
    BillTicketRepository billTicketRepository;
    TicketRepository ticketRepository;
    BillTicketDetailsMapper billTicketDetailsMapper;
    ServiceMapper serviceMapper;

    public BillTicketDetailsResponse createBillTicketDetails(BillTicketDetailsRequest request) {
        BillTicketDetails billTicketDetails = billTicketDetailsMapper.toBillTicketDetails(request);

        billTicketDetails.setBillTicket(billTicketRepository.findById(request.getIdBillTicket())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        billTicketDetails.setTicket(ticketRepository.findById(request.getIdTicket())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        return billTicketDetailsMapper.toBillTicketDetailsResponse(billTicketDetailsRepository.save(billTicketDetails));
    }

    public List<MapEntryResponse<ServiceResponse,MapEntryResponse<String, List<BillTicketDetailsResponse>>>> getBillTicketDetailsByBillTicket(String idBillTicket) {
        List<MapEntryResponse<ServiceResponse,MapEntryResponse<String, List<BillTicketDetailsResponse>>>> billTicketDetailsMap = new LinkedList<>();

        List<BillTicketDetails> billTicketDetailsList = billTicketDetailsRepository.findByBillTicket_Id
                (idBillTicket, Sort.by(Sort.Direction.ASC, "ticket_serviceEntity_name"));

        List<ServiceEntity> serviceEntities = billTicketDetailsList.stream()
                .map(billTicketDetails -> billTicketDetails.getTicket().getServiceEntity())
                .distinct().toList();

        serviceEntities.forEach(serviceEntity -> {
            Sort sort = Sort.by(Sort.Direction.DESC, "ticket_price");

            List<BillTicketDetails> billTicketDetails = billTicketDetailsRepository
                    .findByBillTicket_IdAndTicket_ServiceEntity(idBillTicket, serviceEntity, sort);

            if (!billTicketDetails.isEmpty()) {
                billTicketDetailsMap.add(MapEntryResponse.<ServiceResponse, MapEntryResponse<String, List<BillTicketDetailsResponse>>>builder()
                        .key(serviceMapper.toResponse(serviceEntity))
                        .value(MapEntryResponse.<String, List<BillTicketDetailsResponse>>builder()
                                .key(billTicketDetails.getFirst().getStatus())
                                .value(billTicketDetails.stream().map(billTicketDetailsMapper::toBillTicketDetailsResponse).toList())
                                .build())
                        .build());
            }
        });

        return billTicketDetailsMap;
    }
}
