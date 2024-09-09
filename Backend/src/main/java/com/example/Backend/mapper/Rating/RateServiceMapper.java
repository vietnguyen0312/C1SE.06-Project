package com.example.Backend.mapper.Rating;

import com.example.Backend.dto.request.Rating.RateServiceCreationRequest;
import com.example.Backend.dto.request.Rating.RateServiceUpdateRequest;
import com.example.Backend.dto.response.Rating.RateServiceResponse;
import com.example.Backend.entity.Rating.RateService;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RateServiceMapper {
    RateServiceResponse toResponse(RateService rateService);

    RateService toEntity(RateServiceCreationRequest request);

    void updateRateService(@MappingTarget RateService rateService, RateServiceUpdateRequest request);
}
