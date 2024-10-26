package com.example.Backend.components;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class DateTimeFormatter {

    Map<Long, Function<Instant, String>> strategyMap = new LinkedHashMap<>();

    public DateTimeFormatter() {
        strategyMap.put(60L, this::formatInSeconds);
        strategyMap.put(3600L, this::formatInMinutes);
        strategyMap.put(86400L, this::formatInHours);
        strategyMap.put(2592000L, this::formatInDays);
        strategyMap.put(Long.MAX_VALUE, this::formatInDate);
    }

    public String format(Instant instant){
        long elapseSeconds = ChronoUnit.SECONDS.between(instant, Instant.now());

        var strategy = strategyMap.entrySet()
                .stream()
                .filter(longFunctionEntry -> elapseSeconds < longFunctionEntry.getKey())
                .findFirst().get();
        return strategy.getValue().apply(instant);
    }

    private String formatInSeconds(Instant instant){
        long elapseSeconds = ChronoUnit.SECONDS.between(instant, Instant.now());
        return String.format("%s giây", elapseSeconds);
    }

    private String formatInMinutes(Instant instant){
        long elapseMinutes = ChronoUnit.MINUTES.between(instant, Instant.now());
        return String.format("%s phút", elapseMinutes);
    }

    private String formatInHours(Instant instant){
        long elapseHours = ChronoUnit.HOURS.between(instant, Instant.now());
        return String.format("%s giờ", elapseHours);
    }

    private String formatInDays(Instant instant){
        long elapseDays = ChronoUnit.DAYS.between(instant, Instant.now());
        return String.format("%s ngày", elapseDays);
    }

    private String formatInDate(Instant instant){
        LocalDateTime localDateTime = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        java.time.format.DateTimeFormatter dateTimeFormatter = java.time.format.DateTimeFormatter.ofPattern("dd-MM-yyyy");

        return localDateTime.format(dateTimeFormatter);
    }
}
