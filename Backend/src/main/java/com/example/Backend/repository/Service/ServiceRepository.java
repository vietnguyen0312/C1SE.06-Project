package com.example.Backend.repository.Service;

import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Service.ServiceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
    Page<ServiceEntity> findByNameOrDescriptionContaining(String name, String description, Pageable pageable);

    Page<ServiceEntity> findByServiceTypeIn(List<ServiceType> serviceType, Pageable pageable);

    Page<ServiceEntity> findByServiceTypeInAndNameOrDescriptionContaining(List<ServiceType> serviceType, String name,
                                                                         String description, Pageable pageable);
}
