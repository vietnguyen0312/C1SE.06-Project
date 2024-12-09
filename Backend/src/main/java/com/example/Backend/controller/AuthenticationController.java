package com.example.Backend.controller;

import com.example.Backend.dto.request.AuthenticationRequest;
import com.example.Backend.dto.request.LogoutRequest;
import com.example.Backend.dto.request.RefreshRequest;
import com.example.Backend.dto.request.User.ResetPasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.AuthenticationResponse;
import com.example.Backend.service.AuthenticationService;
import com.example.Backend.service.MailService;
import com.nimbusds.jose.JOSEException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationController {
    AuthenticationService authenticationService;
    MailService mailService;

    @PostMapping("/outbound/authentication")
    ApiResponse<AuthenticationResponse> outboundAuthenticate(@RequestParam("code") String code) {
        var result = authenticationService.outboundAuthenticate(code);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticated(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestParam("email") String email)
            throws MessagingException, IOException, ParseException, JOSEException {
        String confirmLink = authenticationService.forgotPassword(email);

        mailService.sendConfirmLink(email, confirmLink);

        return ApiResponse.<String>builder()
                .result("Send Mail ConFirm Successful")
                .build();
    }

    @PostMapping("/confirm-reset-password")
    public ApiResponse<String> confirmResetPassword(@RequestParam("code") String resetToken) throws ParseException, JOSEException {
        return ApiResponse.<String>builder()
                .result(authenticationService.confirmResetPassword(resetToken))
                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody @Valid ResetPasswordRequest request) throws ParseException, JOSEException {
        return ApiResponse.<String>builder()
                .result(authenticationService.resetPassword(request))
                .build();
    }
}
