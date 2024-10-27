package com.example.Backend.repository.User;

import com.example.Backend.entity.User.CustomerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerTypeRepository extends JpaRepository<CustomerType, String> {
    boolean existsByName(String name);
    CustomerType findByName(String name);
}
