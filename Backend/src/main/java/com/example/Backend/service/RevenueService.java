package com.example.Backend.service;

import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.RevenueResponse;
import com.example.Backend.dto.response.RoomTypeRevenueResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.dto.response.ServiceRevenueResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.repository.Bill.BillTicketDetailsRepository;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.Booking.BookingRoomDetailsRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RevenueService {
    BookingRoomRepository bookingRoomRepository;
    BookingRoomDetailsRepository bookingRoomDetailsRepository;
    BillTicketRepository billTicketRepository;
    BillTicketDetailsRepository billTicketDetailsRepository;

    @PreAuthorize("hasRole('EMPLOYER')")
    public List<RevenueResponse> getAllRevenue() {
        List<RevenueResponse> revenueResponseList = new LinkedList<>();
        int month = LocalDate.now().getMonthValue();
        int year = LocalDate.now().getYear();
        for (int i=month; i>month-4; i--) {
            revenueResponseList.add(RevenueResponse.builder()
                        .month(month == i ? "Now" : Month.of(i).getDisplayName(TextStyle.FULL, Locale.ENGLISH))
                        .rooms(bookingRoomRepository.findSumIncomeByMonthAndYear(i, year))
                        .tickets(billTicketRepository.findSumIncomeByMonthAndYear(i, year))
                        .numOfBill(billTicketRepository.countBillByMonthAndYear(i, year) + bookingRoomRepository.countBillByMonthAndYear(i, year))
                        .totalRevenue(billTicketRepository.findSumIncomeByMonthAndYear(i, year) + bookingRoomRepository.findSumIncomeByMonthAndYear(i, year))
                        .build());
        }
        return revenueResponseList.reversed();
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<ServiceRevenueResponse> getTopService(Instant startDate, Instant endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        var pageData = billTicketDetailsRepository.findTopServicesByRevenue(startDate, endDate, pageable);

        return PageResponse.<ServiceRevenueResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent())
                .build();
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<RoomTypeRevenueResponse> getTopRoomType(Instant startDate, Instant endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        var pageData = bookingRoomDetailsRepository.findTopRoomTypeByRevenue(startDate, endDate, pageable);

        return PageResponse.<RoomTypeRevenueResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent())
                .build();
    }
}
