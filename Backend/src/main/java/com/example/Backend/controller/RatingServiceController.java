package com.example.Backend.controller;

import com.example.Backend.dto.request.Rating.RateServiceCreationRequest;
import com.example.Backend.dto.request.Rating.RateServiceUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
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
@RequestMapping("/ratingServices")
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
    ApiResponse<List<RateServiceResponse>> getAllRateService(){
        return ApiResponse.<List<RateServiceResponse>>builder()
                .result(rateServiceService.getAllRateServices())
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
    ApiResponse deleteRateService(@PathVariable("id")String id){
        rateServiceService.deleteRateService(id);
        return ApiResponse.builder().build();
    }
}
