package com.example.Backend.mapper.QuestionChatbot;


import com.example.Backend.dto.request.QuestionChatbot.FAQCreateRequest;
import com.example.Backend.dto.request.QuestionChatbot.FAQIUpdateRequest;
import com.example.Backend.dto.response.QuestionChatbot.FAQResponse;
import com.example.Backend.entity.QuestionChatbot.FAQ;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FAQMapper {
    FAQ  toFaq(FAQCreateRequest faqCreateRequest);
    void updateFaq(@MappingTarget FAQ faq, FAQIUpdateRequest updateRequest);
    FAQResponse toFAQResponse(FAQ faq);
}
