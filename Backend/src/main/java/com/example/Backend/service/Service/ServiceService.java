package com.example.Backend.service.Service;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Service.ServiceMapper;
import com.example.Backend.repository.Service.ServiceRepository;
import com.example.Backend.repository.Service.ServiceTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

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
            ServiceEntity serviceEntity = serviceMapper.toService(request);
            serviceEntity.setServiceType(serviceTypeRepository.findById(request.getServiceTypeId())
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
            return serviceMapper.toResponse(serviceRepository.save(serviceEntity));
        } catch (Exception e) {
            throw new AppException(ErrorCode.EXISTED);
        }
    }

    public PageResponse<ServiceResponse> getAllServices(int page, int size, String search) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name").ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<ServiceEntity> pageData;
        if (StringUtils.hasLength(search))
            pageData = serviceRepository.findByNameOrDescriptionContaining(search, search, pageable);
        else
            pageData = serviceRepository.findAll(pageable);

        return PageResponse.<ServiceResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(serviceMapper::toResponse).toList())
                .build();
    }

    public ServiceResponse getServiceById(String id) {
        return serviceMapper.toResponse(serviceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public ServiceResponse updateService(String id, ServiceRequest request) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        serviceMapper.updateService(service, request);
        service.setServiceType(serviceTypeRepository.findById(request.getServiceTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));

        return serviceMapper.toResponse(serviceRepository.save(service));
    }

    @PreAuthorize("hasRole('MANAGER')")
    public void deleteService(String id) {
        serviceRepository.deleteById(id);
    }

    public PageResponse<ServiceResponse> getServiceByServiceType(List<String> idServiceType, int page, int size, String search) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name").ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<ServiceEntity> pageData;

        if (StringUtils.hasLength(search))
            pageData = serviceRepository.findByServiceTypeInAndNameOrDescriptionContaining
                    (serviceTypeRepository.findAllById(idServiceType), search, search, pageable);
        else
            pageData = serviceRepository.findByServiceTypeIn(serviceTypeRepository.findAllById(idServiceType), pageable);

        return PageResponse.<ServiceResponse>builder()
                .currentPage(page)
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(serviceMapper::toResponse).toList())
                .build();
    }

}
