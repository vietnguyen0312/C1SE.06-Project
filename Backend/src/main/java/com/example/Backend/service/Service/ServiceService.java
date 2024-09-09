package com.example.Backend.service.Service;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.Service.ServiceType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Service.ServiceMapper;
import com.example.Backend.repository.Service.ServiceRepository;
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
public class ServiceService {
    ServiceRepository serviceRepository;
    ServiceTypeRepository serviceTypeRepository;
    ServiceMapper serviceMapper;

    public ServiceEntity createService(ServiceRequest request) {
        if (serviceRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.EXISTED);
        }
        ServiceEntity serviceEntity = serviceMapper.toEntity(request);
        return serviceRepository.save(serviceEntity);
    }

    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(serviceMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse getServiceById(String id) {
        ServiceEntity serviceEntity = serviceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return serviceMapper.toResponse(serviceEntity);
    }

    public ServiceResponse updateService(String id, ServiceRequest request) {
        ServiceEntity serviceEntity = serviceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        ServiceType serviceType = serviceTypeRepository.findById(request.getServiceTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        serviceEntity.setName(request.getName());
        serviceEntity.setDescription(request.getDescription());
        serviceEntity.setImage(request.getImage());
        serviceEntity.setServiceType(serviceType);

        ServiceEntity updatedServiceEntity = serviceRepository.save(serviceEntity);
        return serviceMapper.toResponse(updatedServiceEntity);
    }

    public void deleteService(String id) {
        serviceRepository.deleteById(id);
    }

    public List<ServiceResponse> getServiceByServiceType(ServiceType serviceType) {
        return serviceRepository.findAllByServiceType(serviceType).stream().map(serviceMapper::toResponse).toList();
    }
}
