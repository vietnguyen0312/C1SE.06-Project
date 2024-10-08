package com.example.Backend.controller;

import com.example.Backend.dto.request.Rating.RateServiceCreationRequest;
import com.example.Backend.dto.request.Rating.RateServiceUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Rating.RateServiceResponse;
import com.example.Backend.service.Rating.RateServiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rate-services")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RatingServiceController {
    RateServiceService rateServiceService;

    @PostMapping
    ApiResponse<RateServiceResponse> createRateService(@RequestBody @Valid RateServiceCreationRequest request){
        return ApiResponse.<RateServiceResponse>builder()
                .result(rateServiceService.createRateService(request))
                .build();
    }

    @GetMapping
    ApiResponse<PageResponse<RateServiceResponse>> getRateService(
            @RequestParam(value = "serviceId", required = false) String idService,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size
    ){
        return ApiResponse.<PageResponse<RateServiceResponse>>builder()
                .result(rateServiceService.getRateServices(idService,page,size))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<RateServiceResponse> getRateServiceById(@PathVariable("id")String id){
        return ApiResponse.<RateServiceResponse>builder()
                .result(rateServiceService.getRateServiceById(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<RateServiceResponse> updateRateService(@PathVariable("id")String id,@RequestBody @Valid RateServiceUpdateRequest request){
        return ApiResponse.<RateServiceResponse>builder()
                .result(rateServiceService.updateRateService(request,id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteRateService(@PathVariable("id")String id){
        rateServiceService.deleteRateService(id);
        return ApiResponse.<Void>builder().build();
    }
}
