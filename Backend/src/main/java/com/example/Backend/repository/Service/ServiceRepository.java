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
    List<ServiceEntity> findByNameOrDescriptionContaining(String name, String description);

    Page<ServiceEntity> findByNameOrDescriptionContaining(String name, String description, Pageable pageable);

    Page<ServiceEntity> findByServiceType_IdIn(List<String> serviceType, Pageable pageable);

    Page<ServiceEntity> findByServiceType_IdInAndNameContainingOrServiceType_IdInAndDescriptionContaining(
            List<String> serviceType1,
            String name,
            List<String> serviceType2,
            String description,
            Pageable pageable);
}
