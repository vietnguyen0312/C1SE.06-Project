package com.example.Backend.dto.request.Room;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUpdateRequest {

    @NotBlank(message = "NOT_NULL")
    String status;
    
    @NotBlank(message = "NOT_NULL")
    String roomTypeId;
}
