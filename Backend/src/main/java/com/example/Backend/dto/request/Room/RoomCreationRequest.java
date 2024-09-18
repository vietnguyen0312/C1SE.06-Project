package com.example.Backend.dto.request.Room;

import com.example.Backend.entity.Room.RoomType;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomCreationRequest {
    @NotBlank(message = "NOT_BLANK")
    String roomTypeId;

    @Positive(message = "POSITIVE")
    int roomNumber ;
}
