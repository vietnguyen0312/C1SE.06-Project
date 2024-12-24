package com.example.Backend.mapper.Bill;

import com.example.Backend.dto.request.Bill.BillTicketDetailUpdateRequest;
import com.example.Backend.dto.request.Bill.BillTicketDetailsRequest;
import com.example.Backend.dto.response.Bill.BillTicketDetailsResponse;
import com.example.Backend.entity.Bill.BillTicketDetails;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BillTicketDetailsMapper {
    BillTicketDetails toBillTicketDetails(BillTicketDetailsRequest request);

    BillTicketDetailsResponse toBillTicketDetailsResponse(BillTicketDetails billTicketDetails);

    void updateBillTicketDetail(@MappingTarget BillTicketDetails billTicketDetails, BillTicketDetailUpdateRequest request);
}
