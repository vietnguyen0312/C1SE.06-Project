package com.example.Backend.dto.response.Bill;

import com.example.Backend.entity.User.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketResponse {
    String id;
    User user;
    Date datePay;
    Date dateUse;
    double total;
    String status;
}
