package com.example.Backend.dto.response;

import com.example.Backend.dto.response.Service.ServiceResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MapEntryResponse<K,V> {
    K key;
    V value;
}
