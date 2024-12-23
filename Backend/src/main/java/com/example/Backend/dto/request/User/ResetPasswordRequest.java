package com.example.Backend.dto.request.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordRequest {
    @NotBlank(message = "NOT_BLANK")
    String resetToken;

    @NotBlank(message = "NOT_BLANK")
    @Size(min = 8, message = "MIN_SIZE")
    String newPassword;
}
