package com.example.Backend.repository.Bill;

import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Service.ServiceEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillTicketDetailsRepository extends JpaRepository<BillTicketDetails, String> {
    List<BillTicketDetails> findByBillTicket_Id(String id, Sort sort);

    List<BillTicketDetails> findByBillTicket_IdAndTicket_ServiceEntity(String idBillTicket, ServiceEntity serviceEntity, Sort sort);
}
