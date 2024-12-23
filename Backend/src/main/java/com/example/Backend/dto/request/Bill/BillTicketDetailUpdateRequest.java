package com.example.Backend.dto.request.Bill;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicketDetailUpdateRequest {
    @NotBlank(message = "NOT_BLANK")
    String status;
}
