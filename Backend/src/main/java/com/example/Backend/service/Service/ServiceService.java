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
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('MANAGER')")
    public ServiceResponse createService(ServiceRequest request) {
        try {
            ServiceEntity serviceEntity = serviceMapper.toRequest(request);
            serviceEntity.setServiceType(serviceTypeRepository.findById(request.getServiceTypeId()).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
            return serviceMapper.toResponse(serviceRepository.save(serviceEntity));
        } catch (Exception e) {
            throw new AppException(ErrorCode.EXISTED);
        }
    }

    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(serviceMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse getServiceById(String id) {
        return serviceMapper.toResponse(serviceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public ServiceResponse updateService(String id, ServiceRequest request) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        serviceMapper.updateService(service, request);
        service.setServiceType(serviceTypeRepository.findById(request.getServiceTypeId()).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));

        return serviceMapper.toResponse(serviceRepository.save(service));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteService(String id) {
        serviceRepository.deleteById(id);
    }

    public List<ServiceResponse> getServiceByServiceType(String idServiceType) {
        return serviceRepository.findAllByServiceType(serviceTypeRepository.findById(idServiceType)
                .orElseThrow(()->new AppException(ErrorCode.NOT_EXISTED)))
                .stream().map(serviceMapper::toResponse).toList();
    }
}
