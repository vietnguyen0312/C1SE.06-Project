package com.example.Backend.mapper.Service;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceEntity toService(ServiceRequest request);

    void updateService(@MappingTarget ServiceEntity service, ServiceRequest request);

    ServiceResponse toResponse(ServiceEntity serviceEntity);
}
