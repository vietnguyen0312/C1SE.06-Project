package com.example.Backend.service.Rating;

import com.example.Backend.dto.request.Rating.RateServiceCreationRequest;
import com.example.Backend.dto.request.Rating.RateServiceUpdateRequest;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Rating.RateServiceResponse;
import com.example.Backend.entity.Bill.BillTicketDetails;
import com.example.Backend.entity.Rating.RateService;
import com.example.Backend.entity.User.User;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.mapper.Rating.RateServiceMapper;
import com.example.Backend.repository.Bill.BillTicketDetailsRepository;
import com.example.Backend.repository.Rating.RateServiceRepository;
import com.example.Backend.repository.Service.ServiceRepository; // Cập nhật import
import com.example.Backend.repository.User.UserRepository;
import com.example.Backend.components.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RateServiceService {
    DateTimeFormatter dateTimeFormatter;
    RateServiceRepository rateServiceRepository;
    ServiceRepository serviceRepository;
    UserRepository userRepository;
    RateServiceMapper rateServiceMapper;
    BillTicketDetailsRepository billTicketDetailsRepository;

    public RateServiceResponse createRateService(RateServiceCreationRequest request) {
        RateService rateService = rateServiceMapper.toEntity(request);

        rateService.setServiceEntity(serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));

        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.NOT_EXISTED));

        rateService.setUser(user);

        BillTicketDetails billTicketDetails = billTicketDetailsRepository
                .findById(request.getBillTicketDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));

        billTicketDetails.setStatus("đã đánh giá");


        return rateServiceMapper.toResponse(rateServiceRepository.save(rateService));
    }

    public PageResponse<RateServiceResponse> getRateServices(String idService, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "dateUpdate").ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        var pageData = rateServiceRepository.findByServiceEntity_Id(idService, pageable);

        var dataMapper = pageData.getContent().stream().map(rating -> {
            RateServiceResponse rateServiceResponses = rateServiceMapper.toResponse(rating);
            rateServiceResponses.setFormatDate(dateTimeFormatter.format(rateServiceResponses.getDateUpdate()));
            return rateServiceResponses;
        }).toList();

        return PageResponse.<RateServiceResponse>builder()
                .totalPages(pageData.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .totalElements(pageData.getTotalElements())
                .data(dataMapper)
                .build();
    }

    public Double getAVGScoreByServiceEntity(String idService) {
        return rateServiceRepository.findAverageScoreByServiceEntity_Id(idService);
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

    @PostAuthorize("returnObject.user.email == authentication.name or hasRole('MANAGER')")
    public RateServiceResponse updateRateService(RateServiceUpdateRequest request, String id) {
        RateService rateService = rateServiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        rateServiceMapper.updateRateService(rateService, request);
        return rateServiceMapper.toResponse(rateServiceRepository.save(rateService));
    }
}
