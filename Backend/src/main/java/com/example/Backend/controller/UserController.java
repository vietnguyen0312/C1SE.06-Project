package com.example.Backend.controller;

import com.example.Backend.dto.request.User.UserChangePasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.request.User.UserUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.PageResponse;
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
import java.util.Set;

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
    ApiResponse<PageResponse<UserResponse>> getUsers(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "6") int size,
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "role", required = false, defaultValue = "CUSTOMER")String role
    ) {
        return ApiResponse
                .<PageResponse<UserResponse>>builder()
                .result(userService.getUsers(page, size, search, role))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponse> getUser(@PathVariable("id") String id) {
        return ApiResponse
                .<UserResponse>builder()
                .result(userService.getUser(id))
                .build();
    }

    @GetMapping("/verify-email")
    ApiResponse<Boolean> verifyEmail(@RequestParam(value = "email", required = true)String email){
        return ApiResponse.<Boolean>builder()
                .result(userService.existedUserByEmail(email))
                .build();
    }

    @GetMapping("/email/{email}")
    ApiResponse<UserResponse> getUserByEmail(@PathVariable("email") String email) {
        return ApiResponse
                .<UserResponse>builder()
                .result(userService.getUserByGmail(email))
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
