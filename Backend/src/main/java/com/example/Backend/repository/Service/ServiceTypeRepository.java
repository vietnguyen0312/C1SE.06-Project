package com.example.Backend.repository.Service;

import com.example.Backend.entity.Service.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, String> {
    boolean existsByName(String name);
}

