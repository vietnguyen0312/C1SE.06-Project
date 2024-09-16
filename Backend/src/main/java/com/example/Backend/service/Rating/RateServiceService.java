package com.example.Backend.service.Rating;

import com.example.Backend.dto.request.Rating.RateServiceCreationRequest;
import com.example.Backend.dto.request.Rating.RateServiceUpdateRequest;
import com.example.Backend.dto.response.Rating.RateServiceResponse;
import com.example.Backend.entity.Rating.RateService;
import com.example.Backend.entity.Service.ServiceEntity;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Rating.RateServiceMapper;
import com.example.Backend.repository.Rating.RateServiceRepository;
import com.example.Backend.repository.Service.ServiceRepository; // Cập nhật import
import com.example.Backend.repository.User.UserRepository;
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
public class RateServiceService {
    RateServiceRepository rateServiceRepository;
    ServiceRepository serviceRepository;
    UserRepository userRepository;
    RateServiceMapper rateServiceMapper;

    public RateServiceResponse createRateService(RateServiceCreationRequest request) {
        RateService rateService = rateServiceMapper.toEntity(request);

        rateService.setServiceEntity(serviceRepository.findById(request.getServiceId())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        rateService.setUser(userRepository.findById(request.getUserId())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)));

        RateService savedRateService = rateServiceRepository.save(rateService);
        return rateServiceMapper.toResponse(savedRateService);
    }

    public List<RateServiceResponse> getAllRateServices() {
        return rateServiceRepository.findAll().stream()
                .map(rateServiceMapper::toResponse)
                .collect(Collectors.toList());
    }

    public RateServiceResponse getRateServiceById(String id) {
        RateService rateService = rateServiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        return rateServiceMapper.toResponse(rateService);
    }

    public void deleteRateService(String id) {
        RateService rateService = rateServiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        rateServiceRepository.delete(rateService);
    }

    public RateServiceResponse updateRateService(RateServiceUpdateRequest request, String id) {
        RateService rateService = rateServiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        rateServiceMapper.updateRateService(rateService, request);
        return rateServiceMapper.toResponse(rateServiceRepository.save(rateService));
    }
}
