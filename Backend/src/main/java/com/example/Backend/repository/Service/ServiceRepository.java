package com.example.Backend.repository.Service;

import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Service.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
    boolean existsByName(String name);
    List<ServiceEntity> findAllByServiceType(ServiceType serviceType);
}
