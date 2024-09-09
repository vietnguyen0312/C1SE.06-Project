package com.example.Backend.service.Service;

import com.example.Backend.dto.request.Service.ServiceTypeRequest;
import com.example.Backend.dto.response.Service.ServiceTypeResponse;
import com.example.Backend.entity.Service.ServiceType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Service.ServiceTypeMapper;
import com.example.Backend.repository.Service.ServiceTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ServiceTypeService {
    ServiceTypeRepository serviceTypeRepository;
    ServiceTypeMapper serviceTypeMapper;

    public ServiceType createServiceType(ServiceTypeRequest request) {
        if (serviceTypeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.EXISTED);
        }
        ServiceType serviceType = serviceTypeMapper.toEntity(request);
        return serviceTypeRepository.save(serviceType);
    }
    public List<ServiceTypeResponse> getAllServiceTypes() {
        return serviceTypeRepository.findAll().stream()
                .map(serviceTypeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ServiceTypeResponse getServiceTypeById(String id) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return serviceTypeMapper.toResponse(serviceType);
    }
    public ServiceTypeResponse updateServiceType(String id, ServiceTypeRequest request) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        serviceType.setName(request.getName());
        ServiceType updatedServiceType = serviceTypeRepository.save(serviceType);
        return serviceTypeMapper.toResponse(updatedServiceType);
    }

    public void deleteServiceType(String id) {
        serviceTypeRepository.deleteById(id);
    }

}
