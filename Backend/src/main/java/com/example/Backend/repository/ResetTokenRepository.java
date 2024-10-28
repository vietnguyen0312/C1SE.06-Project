package com.example.Backend.repository;

import com.example.Backend.entity.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ResetTokenRepository extends JpaRepository<ResetToken, String> {
    List<ResetToken> findByExpiryTimeBefore(Date expiryTime);

    ResetToken findByUser_Email(String email);

    boolean existsByUser_Email(String email);
}
