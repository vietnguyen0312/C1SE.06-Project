package com.example.Backend.repository.Rating;

import com.example.Backend.entity.Rating.RateService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RateServiceRepository extends JpaRepository<RateService, String> {
    Page<RateService> findByServiceEntity_Id(String id, Pageable pageable);

    @Query("SELECT COALESCE(AVG(rs.score), 0) FROM RateService rs WHERE rs.serviceEntity.id = :id")
    Double findAverageScoreByServiceEntity_Id(@Param("id") String id);

}
