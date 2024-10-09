package com.example.Backend.entity.Booking;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "booking_room")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column
    @Temporal(TemporalType.DATE)
    Date checkInDate;

    @Column
    @Temporal(TemporalType.DATE)
    Date checkOutDate;

    @Column(nullable = false) // test commit
    double total;

    @Column
    String status;

}
