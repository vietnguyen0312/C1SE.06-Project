package com.example.Backend.repository.User;

import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Page<User> findByUsernameOrEmailOrPhoneNumberContaining(String username, String email,String phoneNumber, Pageable pageable);

    boolean existsByEmailAndStatusIs(String email, String status);
}
