package com.example.Backend.dto.request.Bill;

import com.example.Backend.entity.User.User;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketCreationRequest {
    @NotNull(message = "NOT_NULL")
    User user;

    @Future(message = "DATE_FUTURE")
    Date dateUse;

    @NotBlank(message = "NOT_BLANK")
    double total;

    String status;
}
