package com.example.Backend.entity.Ticket;

import com.example.Backend.entity.Service.ServiceEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "ticket")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    ServiceEntity serviceEntity;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    int quantity;

    @Column(length = 50)
    String status;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = "Đang hoạt động";
        }
    }
}
