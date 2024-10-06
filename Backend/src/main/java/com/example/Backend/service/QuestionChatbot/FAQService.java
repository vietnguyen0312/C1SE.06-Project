package com.example.Backend.service.QuestionChatbot;


import com.example.Backend.dto.request.QuestionChatbot.FAQCreateRequest;

import com.example.Backend.dto.request.QuestionChatbot.FAQIUpdateRequest;
import com.example.Backend.dto.response.PageResponse;
import com.example.Backend.dto.response.QuestionChatbot.FAQResponse;
import com.example.Backend.entity.QuestionChatbot.FAQ;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.exception.AppException;
import com.example.Backend.mapper.QuestionChatbot.FAQMapper;
import com.example.Backend.repository.QuestionChatbot.FAQRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FAQService {
    FAQRepository faqRepository;
    FAQMapper mapper;
    public FAQResponse createFAQRepository( FAQCreateRequest request) {

        if(faqRepository.findById(request.getIntent()).isPresent())
            throw new AppException(ErrorCode.EXISTED);
        var fag = mapper.toFaq(request);
        return mapper.toFAQResponse(faqRepository.save(fag));
    }

    public PageResponse<FAQResponse> getAllFAQs( int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        var pageDate = faqRepository.findAll(pageable);
        var listData = pageDate.getContent().stream().map(mapper::toFAQResponse).toList();
        return PageResponse.<FAQResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(faqRepository.count())
                .data(listData)
                .build();

    }

    public FAQResponse getFAQbyIntent( String intent) {
        return mapper.toFAQResponse(faqRepository.findById(intent).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED)));
    }

    public FAQResponse updateFAQ( String intent, FAQIUpdateRequest request) {
        FAQ faq = faqRepository.findById(intent).orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        mapper.updateFaq(faq, request);
        return mapper.toFAQResponse(faqRepository.save(faq));
    }

    public void deleteFAQ( String intent) {
         faqRepository.deleteById(intent);
    }
}
