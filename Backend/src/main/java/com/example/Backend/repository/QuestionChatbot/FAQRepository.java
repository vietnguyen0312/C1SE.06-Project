package com.example.Backend.repository.QuestionChatbot;

import com.example.Backend.entity.QuestionChatbot.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQRepository  extends JpaRepository<FAQ, String> {

}
