package com.example.Backend.entity.Rating;

import com.example.Backend.entity.Booking.BookingRoomDetails;
import com.example.Backend.entity.Room.Room;
import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "rate_room")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "bookingRoomDetails_id")
    BookingRoomDetails bookingRoomDetails;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(nullable = false)
    double score;

    @Column(columnDefinition = "TEXT")
    String comment;


    Date dateUpdate;
}
