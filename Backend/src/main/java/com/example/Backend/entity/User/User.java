package com.example.Backend.entity.User;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false, length = 255)
    String username;

    @Column(length = 255, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    String email;

    @Column(length = 255)
    String password;

    @Column(length = 50)
    String phoneNumber;

    @Column(length = 10)
    String gender;

    @Column(length = 255)
    String avatar;

    @ManyToOne
    @JoinColumn(name = "customerType_id")
    CustomerType customerType;

    @Column(length = 50)
    String status;

    @ManyToMany
    Set<Role> roles;

    @PrePersist
    public void prePersist() {
        if (!StringUtils.hasLength(status)) {
            status = "Đang hoạt động";
        }
        if (!StringUtils.hasLength(avatar)){
            avatar = "avatar-default.jpg";
        }
    }
}
