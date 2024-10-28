package com.example.Backend.entity;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "reset_token")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetToken {
    @Id
    String id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    User user;

    Date expiryTime;
}
