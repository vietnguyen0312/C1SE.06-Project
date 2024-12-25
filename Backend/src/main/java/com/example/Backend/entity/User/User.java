package com.example.Backend.entity.User;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.util.StringUtils;

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

    @Column(length = 255, unique = true)
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
            avatar = "https://res.cloudinary.com/dgff7kkuu/image/upload/v1734445484/avatar-default.png?fbclid=IwZXh0bgNhZW0CMTAAAR2rsJqGL7u0h760U95I4kcgs-mfJlMCk5W-eWIrvIemyJDRJmiF9iLRm-g_aem_akE3Ike8YqfdihDFOjDI3Q";
        }
    }
}