package com.example.Backend.controller;

import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.service.VnPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class VnPayController {
    VnPayService vnPayService;
    ArrayList<String> v = new ArrayList<>();

    @GetMapping("/vn-pay")
    public ApiResponse<String> pay(HttpServletRequest request) {
        return ApiResponse.<String>builder()
                .result(vnPayService.createVnPayPayment(request))
                .build();
    }
}
