package com.example.Backend.service;

import com.example.Backend.dto.request.MailSenderRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MailService {
    JavaMailSender javaMailSender;

    @NonFinal
    @Value("${spring.mail.username}")
    String fromMail;

    public String sendMail(String toEmail, MailSenderRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setTo(toEmail);
        message.setText(request.getBody());
        message.setSubject(request.getSubject());
        javaMailSender.send(message);
        return "Mail Sent successfully....";
    }
}
