package com.example.Backend.repository.Bill;

import com.example.Backend.dto.response.ServiceRevenueResponse;
import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Service.ServiceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BillTicketDetailsRepository extends JpaRepository<BillTicketDetails, String> {
    List<BillTicketDetails> findByBillTicket_Id(String id);

    List<BillTicketDetails> findByBillTicket_Id(String id, Sort sort);

    List<BillTicketDetails> findByBillTicket_IdAndTicket_ServiceEntity(String idBillTicket, ServiceEntity serviceEntity, Sort sort);

    @Query("SELECT new com.example.Backend.dto.response.ServiceRevenueResponse(b.ticket.serviceEntity, SUM(b.total)) " +
            "FROM BillTicketDetails b " +
            "WHERE b.billTicket.dateCreated BETWEEN :startDate AND :endDate " +
            "GROUP BY b.ticket.serviceEntity " +
            "ORDER BY SUM(b.total) DESC")
    Page<ServiceRevenueResponse> findTopServicesByRevenue(
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            Pageable pageable);
}
