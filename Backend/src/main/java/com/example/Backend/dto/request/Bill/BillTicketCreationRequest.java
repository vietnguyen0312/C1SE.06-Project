package com.example.Backend.dto.request.Bill;

import com.example.Backend.entity.User.User;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketCreationRequest {
    @PositiveOrZero(message = "POSITIVE_OR_ZERO")
    double total;
}
