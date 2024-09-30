package com.example.Backend.dto.request.User;

import com.example.Backend.entity.User.CustomerType;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {

    @NotBlank(message = "NOT_BLANK")
    @Size(min = 3, max = 50, message = "USERNAME_SIZE")
    String username;

    @NotBlank(message = "NOT_BLANK")
    @Email(message = "INVALID")
    String email;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "INVALID")
    String phoneNumber;

    @Pattern(regexp = "^(Male|Female|Other)$", message = "GENDER_INVALID")
    String gender;

    String avatar;

    CustomerType customerType;

    String status;
}
