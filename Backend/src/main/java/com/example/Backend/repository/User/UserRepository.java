package com.example.Backend.repository.User;

import com.example.Backend.entity.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailOrPhoneNumber(String email, String phoneNumber);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u " +
            "WHERE SIZE(u.roles) = :priorityRole " +
            "AND (:search IS NULL OR u.username LIKE %:search% OR u.email LIKE %:search% OR u.phoneNumber LIKE %:search%)")
    Page<User> findByRoles_SizeAndSearch(@Param("priorityRole") int priorityRole,
                                         @Param("search") String search,
                                         Pageable pageable);

    @Query("SELECT u FROM User u WHERE SIZE(u.roles) = :priorityRole")
    Page<User> findByRoles_Size(@Param("priorityRole") int priorityRole, Pageable pageable);

    @Query("SELECT u FROM User u " +
            "WHERE (:search IS NULL OR u.phoneNumber LIKE %:search%) " +
            "AND EXISTS (SELECT r FROM u.roles r WHERE r.name = 'CUSTOMER')")
    Page<User> findBySearchAndRoleCustomerByPhone(@Param("search") String search,Pageable pageable);

    @Query("SELECT u FROM User u " +
            "WHERE (:search IS NULL OR u.email LIKE %:search%) " +
            "AND EXISTS (SELECT r FROM u.roles r WHERE r.name = 'CUSTOMER')")
    Page<User> findBySearchAndRoleCustomerByEmail(@Param("search") String search,Pageable pageable);
}
