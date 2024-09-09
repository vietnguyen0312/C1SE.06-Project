package com.example.Backend.entity.Room;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "room")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(unique = true)
    int roomNumber;

    @ManyToOne
    @JoinColumn(name = "roomType_id")
    RoomType roomType;


    @Column(length = 50)
    String status;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = "Đang hoạt động";
        }
    }
}
