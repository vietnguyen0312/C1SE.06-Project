package com.example.Backend.mapper.Bill;

import com.example.Backend.dto.request.Bill.BillTicketCreationRequest;
import com.example.Backend.dto.request.Bill.BillTicketUpdateRequest;
import com.example.Backend.dto.response.Bill.BillTicketResponse;
import com.example.Backend.entity.Bill.BillTicket;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BillTicketMapper {
    BillTicket toBillTicket(BillTicketCreationRequest request);

    void updateBillTicket(@MappingTarget BillTicket billTicket, BillTicketUpdateRequest request);

    BillTicketResponse toBillTicketResponse(BillTicket billTicket);
}
