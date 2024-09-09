package com.example.Backend.dto.request.User;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {
    @NotBlank(message = "NOT_BLANK")
    String name;

    @NotBlank(message = "NOT_BLANK")
    String description;
}
