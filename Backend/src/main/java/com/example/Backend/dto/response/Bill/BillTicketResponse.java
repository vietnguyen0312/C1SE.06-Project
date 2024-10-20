package com.example.Backend.dto.response.Bill;

import com.example.Backend.entity.User.User;
import jakarta.persistence.PrePersist;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.util.StringUtils;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketResponse {
    String id;
    User user;
    Instant datePay;
    double total;
    String status;

    @PrePersist
    public void prePersist() {
        if (!StringUtils.hasLength(status)) {
            status = "Đã thanh toán";
        }
    }
}
