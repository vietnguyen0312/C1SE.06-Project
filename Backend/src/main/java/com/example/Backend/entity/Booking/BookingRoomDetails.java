package com.example.Backend.entity.Booking;

import com.example.Backend.entity.Room.Room;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Entity
@Table(name = "booking_room_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoomDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @ManyToOne
    @JoinColumn(name = "booking_room_id")
    BookingRoom bookingRoom;

    @Column(nullable = false)
    double price;

    @Column(nullable = true)
    Instant checkIned;

    @Column(nullable = true)
    Instant checkOuted;

    @Column(name = "status")
    String status;
}
