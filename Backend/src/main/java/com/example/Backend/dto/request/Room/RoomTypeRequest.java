package com.example.Backend.dto.request.Room;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomTypeRequest {

    @NotBlank(message = "NOT_BLANK")
    @Size(max = 255, message = "MAX_SIZE")
    String name;

    @Positive(message = "POSITIVE")
    double price;

    @Size(max = 255, message = "MAX_SIZE")
    String image;

    @Size(max = 255, message = "MAX_SIZE")
    String detail;

    @Positive(message = "POSITIVE")
    int maxOfPeople;
}
