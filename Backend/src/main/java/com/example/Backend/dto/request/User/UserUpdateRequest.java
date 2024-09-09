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

    @Email(message = "INVALID")
    @NotBlank(message = "NOT_BLANK")
    String email;

    @NotBlank(message = "NOT_BLANK")
    @Size(min = 8, message = "MIN_SIZE")
    String password;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "INVALID")
    String phoneNumber;

    @Past(message = "DOB_PAST")
    Date dob;

    @Pattern(regexp = "^(Male|Female|Other)$", message = "GENDER_INVALID")
    String gender;

    String avatar;

    String nation;

    @NotNull(message = "NOT_NULL")
    CustomerType customerType;

    @NotBlank(message = "NOT_BLANK")
    String status;

    Set<String> roles;
}
