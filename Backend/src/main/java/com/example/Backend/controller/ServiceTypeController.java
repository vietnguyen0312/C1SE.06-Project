package com.example.Backend.controller;

import com.example.Backend.dto.request.Service.ServiceTypeRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Service.ServiceTypeResponse;
import com.example.Backend.service.Service.ServiceTypeService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/serviceTypes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ServiceTypeController {
    ServiceTypeService serviceTypeService;

    @PostMapping
    ApiResponse<ServiceTypeResponse> createServiceType(@RequestBody @Valid ServiceTypeRequest request) {
        return ApiResponse.<ServiceTypeResponse>builder()
                .result(serviceTypeService.createServiceType(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<ServiceTypeResponse>> getAllServiceType() {
        return ApiResponse.<List<ServiceTypeResponse>>builder()
                .result(serviceTypeService.getAllServiceTypes())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ServiceTypeResponse> getServiceType(@PathVariable("id") String id) {
        return ApiResponse.<ServiceTypeResponse>builder()
                .result(serviceTypeService.getServiceTypeById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteServiceType(@PathVariable("id") String id) {
        serviceTypeService.deleteServiceType(id);
        return ApiResponse
                .<String>builder()
                .result("Service Type has been deleted")
                .build();
    }
}
