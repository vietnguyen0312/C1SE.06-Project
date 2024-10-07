package com.example.Backend.entity.QuestionChatbot;

import com.example.Backend.entity.User.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "fag")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FAQ {

    @Id
    @Column(unique = true, nullable = false)
    String intent;

    @Column(columnDefinition = "TEXT")
    String description;
}



