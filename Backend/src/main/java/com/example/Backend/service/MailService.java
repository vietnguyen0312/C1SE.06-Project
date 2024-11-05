package com.example.Backend.service;

import com.example.Backend.dto.request.ContactRequest;
import com.example.Backend.dto.request.MailSenderRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MailService {
    JavaMailSender mailSender;
    TemplateEngine templateEngine;

    @NonFinal
    @Value("${spring.mail.username}")
    String emailFrom;

    @NonFinal
    @Value("${spring.mail.feedback}")
    String handleFeedbackEmail;

    @NonFinal
    @Value("${spring.mail.business}")
    String businessBrand;

    public String sendMail(String toEmail, MailSenderRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setTo(toEmail);
        message.setText(request.getBody());
        message.setSubject(request.getSubject());
        mailSender.send(message);
        return "Mail Sent successfully....";
    }

    public void sendConfirmLink(String emailTo, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        Context context = new Context();

        Map<String, Object> properties = new HashMap<>();
        properties.put("link", link);
        context.setVariables(properties);

        helper.setFrom(emailFrom, businessBrand);
        helper.setTo(emailTo);
        helper.setSubject("Please confirm your email");
        String html = templateEngine.process("confirm-email.html", context);
        helper.setText(html, true);
        mailSender.send(message);
    }

    public void sendContactFeedback(ContactRequest request) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        Context context = new Context();

        Map<String, Object> properties = new HashMap<>();
        properties.put("request", request);
        context.setVariables(properties);

        helper.setFrom(emailFrom, "Contact Feedback From Healing Ecotourism");
        helper.setTo(handleFeedbackEmail);
        helper.setSubject(request.getSubject());
        String html = templateEngine.process("contact-feedback.html", context);
        helper.setText(html, true);
        mailSender.send(message);
    }
}
