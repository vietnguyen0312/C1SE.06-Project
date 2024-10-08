package com.example.Backend.repository.Rating;

import com.example.Backend.entity.Rating.RateService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateServiceRepository extends JpaRepository<RateService, String> {
    Page<RateService> findByServiceEntity_Id(String id, Pageable pageable);
}
