package com.example.Backend.controller;

import com.example.Backend.dto.request.MailSenderRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.service.MailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mails")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MailController {
    MailService mailService;

    @PostMapping("/send/{mail}")
    ApiResponse<String> sendMail(@PathVariable("mail")String mail, @RequestBody MailSenderRequest request) {
        return ApiResponse.<String>builder()
                .result(mailService.sendMail(mail,request))
                .build();
    }
}
