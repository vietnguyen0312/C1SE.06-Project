package com.example.Backend.entity.Booking;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.util.StringUtils;

import java.time.Instant;
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

    @Column(nullable = false)
    Instant checkInDate;

    @Column(nullable = false)
    Instant checkOutDate;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    Instant datePay;

    @Column(nullable = false) // test commit
    double total;

    @Column
    String status;

    @ManyToOne
    @JoinColumn(name = "staff_booker_id") // Nhân viên tạo booking
    User staffBooker;

    @PrePersist
    public void prePersist() {
        if (!StringUtils.hasLength(status)) {
            status = "Chưa thanh toán";
        }
    }

}
