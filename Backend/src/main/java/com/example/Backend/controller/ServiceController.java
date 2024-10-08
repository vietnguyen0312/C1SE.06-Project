package com.example.Backend.controller;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.service.Service.ServiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ServiceController {
    ServiceService serviceService;

    @PostMapping
    ApiResponse<ServiceResponse> createService(@RequestBody @Valid ServiceRequest request) {
        return ApiResponse.<ServiceResponse>builder()
                .result(serviceService.createService(request))
                .build();
    }

    @GetMapping
    ApiResponse<PageResponse<ServiceResponse>> getServiceList(
            @RequestParam(value = "serviceTypeId", required = false) List<String> idServiceType,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size,
            @RequestParam(value = "search", required = false, defaultValue = "") String search) {
        return ApiResponse.<PageResponse<ServiceResponse>>builder()
                .result(serviceService.getServices(idServiceType, page, size, search))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ServiceResponse> getService(@PathVariable("id") String id) {
        return ApiResponse.<ServiceResponse>builder()
                .result(serviceService.getServiceById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteService(@PathVariable("id") String id) {
        serviceService.deleteService(id);
        return ApiResponse
                .<String>builder()
                .message("Service has been deleted")
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<ServiceResponse> updateService(@PathVariable("id") String id, @RequestBody @Valid ServiceRequest request) {
        return ApiResponse
                .<ServiceResponse>builder()
                .result(serviceService.updateService(id, request))
                .build();
    }
}
