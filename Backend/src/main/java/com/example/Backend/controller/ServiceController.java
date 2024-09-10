package com.example.Backend.controller;

import com.example.Backend.dto.request.Service.ServiceRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.Service.ServiceResponse;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.service.Service.ServiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service")
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
    ApiResponse<List<ServiceResponse>> getAllService() {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(serviceService.getAllServices())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ServiceResponse> getService(@PathVariable("id") String id) {
        return ApiResponse.<ServiceResponse>builder()
                .result(serviceService.getServiceById(id))
                .build();
    }

    @GetMapping("/findByServiceType/{idServiceType}")
    ApiResponse<List<ServiceResponse>> getByServiceType(@PathVariable("idServiceType") String idServiceType) {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(serviceService.getServiceByServiceType(idServiceType))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteService(@PathVariable("id") String id) {
        serviceService.deleteService(id);
        return ApiResponse
                .<String>builder()
                .result("Service has been deleted")
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
