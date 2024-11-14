package com.example.Backend.service;

import com.example.Backend.dto.response.MapEntryResponse;
import com.example.Backend.dto.response.RevenueResponse;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.Booking.BookingRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RevenueService {
    BookingRoomRepository bookingRoomRepository;
    BillTicketRepository billTicketRepository;

    @PreAuthorize("hasRole('EMPLOYER')")
    public List<RevenueResponse> getAllRevenue() {
        List<RevenueResponse> revenueResponseList = new LinkedList<>();
        int month = LocalDate.now().getMonthValue();
        for (int i=month; i>=month-4; i--) {
            revenueResponseList.add(RevenueResponse.builder()
                        .month(Month.of(month).getDisplayName(TextStyle.FULL, Locale.ENGLISH))
                        .rooms(bookingRoomRepository.findSumIncomeByMonth(month))
                        .tickets(billTicketRepository.findSumIncomeByMonth(month))
                        .numOfBill(billTicketRepository.countBillByMonth(month) + bookingRoomRepository.countBillByMonth(month))
                        .totalRevenue(billTicketRepository.findSumIncomeByMonth(month) + bookingRoomRepository.findSumIncomeByMonth(month))
                        .build());
        }
        return revenueResponseList.reversed();
    }
}
