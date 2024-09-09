package com.example.Backend.mapper.Service;


import com.example.Backend.dto.request.Service.ServiceTypeRequest;
import com.example.Backend.dto.response.Service.ServiceTypeResponse;
import com.example.Backend.entity.Service.ServiceType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceTypeMapper {
    ServiceType toEntity(ServiceTypeRequest request);

    ServiceTypeResponse toResponse(ServiceType serviceType);
}
