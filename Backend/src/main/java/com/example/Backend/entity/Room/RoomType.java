package com.example.Backend.entity.Room;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "room_type")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(length = 255, nullable = false)
    String name;

    @Column(nullable = false)
    double price;

    @Column(length = 255)
    String image;

    @Column(columnDefinition = "TEXT")
    String detail;

    @Column(nullable = false)
    int maxOfPeople;
}
