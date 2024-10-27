package com.example.Backend.controller;

import com.example.Backend.dto.request.User.UserChangePasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.User.UserResponse;
import com.example.Backend.service.User.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse
                .<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponse> getUser(@PathVariable("id") String id) {
        return ApiResponse
                .<UserResponse>builder()
                .result(userService.getUser(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<UserResponse> updateUser(@PathVariable("id") String id, @RequestBody @Valid UserUpdateRequest request) {
        return ApiResponse
                .<UserResponse>builder()
                .result(userService.updateUser(id, request))
                .build();
    }

    @PostMapping("/change-password/{id}")
    ApiResponse<UserResponse> changePassword(@PathVariable("id") String id, @RequestBody @Valid UserChangePasswordRequest request) {
        return ApiResponse
                .<UserResponse>builder()
                .result(userService.changePassword(id, request))
                .build();
    }
}
