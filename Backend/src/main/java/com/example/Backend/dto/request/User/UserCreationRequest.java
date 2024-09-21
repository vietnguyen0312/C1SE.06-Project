package com.example.Backend.dto.request.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @NotBlank(message = "NOT_BLANK")
    @Size(min = 3, max = 50, message = "USERNAME_SIZE")
    String username;

    @Email(message = "INVALID")
    @NotBlank(message = "NOT_BLANK")
    String email;

    @NotBlank(message = "NOT_BLANK")
    @Size(min = 8, message = "MIN_SIZE")
    String password;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "INVALID")
    String phoneNumber;

    @NotBlank(message = "NOT_BLANK")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "GENDER_INVALID")
    String gender;
}
