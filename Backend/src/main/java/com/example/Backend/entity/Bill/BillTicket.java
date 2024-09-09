package com.example.Backend.entity.Bill;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "bill_ticket")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    Date datePay;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    Date dateUse;

    @Column(nullable = false)
    double total;

    @Column(length = 50)
    String status;
}
