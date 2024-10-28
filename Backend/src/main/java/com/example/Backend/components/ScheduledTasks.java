package com.example.Backend.components;

import com.example.Backend.entity.Bill.BillTicket;
import com.example.Backend.entity.InvalidatedToken;
import com.example.Backend.entity.ResetToken;
import com.example.Backend.repository.Bill.BillTicketRepository;
import com.example.Backend.repository.InvalidatedTokenRepository;
import com.example.Backend.repository.ResetTokenRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ScheduledTasks {
    InvalidatedTokenRepository invalidatedTokenRepository;
    ResetTokenRepository resetTokenRepository;
    BillTicketRepository billTicketRepository;

    @Scheduled(fixedDelay = 12, timeUnit = TimeUnit.HOURS)
    public void removeOutDateToken() {
        List<InvalidatedToken> invalidatedTokenList = invalidatedTokenRepository.findByExpiryTimeBefore(new Date());
        if (invalidatedTokenList != null && !invalidatedTokenList.isEmpty()) {
            invalidatedTokenRepository.deleteAll(invalidatedTokenList);
            log.info("Delete Token Invalid in DB");
        }
    }

    @Scheduled(fixedDelay = 7, timeUnit = TimeUnit.DAYS)
    public void removeOutDateResetToken() {
        List<ResetToken> resetTokens = resetTokenRepository.findByExpiryTimeBefore(new Date());
        if (resetTokens != null && !resetTokens.isEmpty()) {
            resetTokenRepository.deleteAll(resetTokens);
            log.info("Delete Reset Token in DB");
        }
    }

    @Scheduled(fixedDelay = 48, timeUnit = TimeUnit.HOURS)
    public void autoCancelBill() {
        Instant twoDaysAgo = Instant.now().minus(2, ChronoUnit.DAYS);
        List<BillTicket> billTicketList = billTicketRepository.findByDateCreatedBeforeAndStatusIs(twoDaysAgo,"Chưa thanh toán");
        billTicketList.forEach(billTicket -> {
            billTicket.setStatus("Đã huỷ");
            billTicketRepository.save(billTicket);
        });
    }
}
