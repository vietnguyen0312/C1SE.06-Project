package com.example.Backend.service;

import org.springframework.stereotype.Component;
import java.time.*;
import java.time.temporal.ChronoUnit;


@Component
public class DateTimeFormatter {

    public String format(Instant instant) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dateTime = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();

        long epochSecond = ChronoUnit.SECONDS.between(dateTime, now);

        if (epochSecond < 60) {
            return "vừa xong";
        } else if (epochSecond < 3600) {
            long elapsedMinutes = ChronoUnit.MINUTES.between(dateTime, now);
            return elapsedMinutes + " phút";
        } else if (epochSecond < 86400) {
            long elapsedHours = ChronoUnit.HOURS.between(dateTime, now);
            return elapsedHours + " giờ";
        } else {
            // Sử dụng Period để tính toán chính xác thời gian
            Period period = Period.between(dateTime.toLocalDate(), now.toLocalDate());

            if (period.getYears() > 0) {
                return period.getYears() + " năm";
            } else if (period.getMonths() > 0) {
                return period.getMonths() + " tháng";
            } else {
                long elapsedDays = ChronoUnit.DAYS.between(dateTime, now);
                return elapsedDays + " ngày";
            }
        }
    }
}
