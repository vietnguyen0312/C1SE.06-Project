package com.example.Backend.entity.Blog;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "blog")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "blogType_id")
    BlogType blogType;

    @Column(nullable = false, length = 255)
    String title;

    @Column(columnDefinition = "TEXT")
    String body;

    @Column(columnDefinition = "TEXT")
    String contentOpen;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    Instant dateTimeEdit;

    @Column(length = 50)
    String status;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = "Đang hoạt động";
        }
    }
}