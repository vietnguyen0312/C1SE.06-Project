package com.example.Backend.controller;

import com.example.Backend.dto.request.QuestionChatbot.FAQCreateRequest;
import com.example.Backend.dto.request.QuestionChatbot.FAQIUpdateRequest;
import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.QuestionChatbot.FAQResponse;
import com.example.Backend.service.QuestionChatbot.FAQService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FAQController {
    FAQService faqService;

    @PostMapping
    ApiResponse<FAQResponse> createFAQ(@RequestBody  @Valid FAQCreateRequest faqCreateRequest) {
        return ApiResponse.<FAQResponse>builder()
                .result(faqService.createFAQRepository(faqCreateRequest))
                .build();
    }

    @GetMapping
    ApiResponse <PageResponse<FAQResponse>> getFAQ(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                   @RequestParam(value = "size", required = false, defaultValue = "6") int size) {
        return ApiResponse.<PageResponse<FAQResponse>>builder()
                .result(faqService.getAllFAQs(page,size))
                .build();
    }

    @GetMapping("/{intent}")
    ApiResponse<FAQResponse> getFAQbyIntent(@PathVariable("intent") String intent) {
        return ApiResponse.<FAQResponse>builder()
                .result(faqService.getFAQbyIntent(intent))
                .build();
    }

    @DeleteMapping("/{intent}")
    ApiResponse<String> deleteFAQ(@PathVariable("intent") String intent) {
        faqService.deleteFAQ(intent);
        return ApiResponse.<String>builder()
                .result("FAQ has been deleted")
                .build();
    }

    @PutMapping("/{intent}")
    ApiResponse<FAQResponse> updateFAQ(@PathVariable("intent") String intent, @RequestBody @Valid FAQIUpdateRequest updateRequest){
        return ApiResponse.<FAQResponse>builder()
                .result(faqService.updateFAQ(intent,updateRequest))
                .build();
    }

}
