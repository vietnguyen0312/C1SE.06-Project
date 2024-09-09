package com.example.Backend.mapper.Service;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceEntity toEntity(ServiceRequest request);

    ServiceResponse toResponse(ServiceEntity serviceEntity);
}
