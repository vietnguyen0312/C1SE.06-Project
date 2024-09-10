package com.example.Backend.dto.request.Service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRequest {

    @NotBlank(message = "NOT_BLANK")
    @Size(max = 255, message = "MAX_SIZE")
    String name;

    @NotBlank(message = "NOT_BLANK")
    String description;

    @Size(max = 255, message = "MAX_SIZE")
    String image;

    @NotBlank(message = "NOT_BLANK")
    String serviceTypeId;
}
