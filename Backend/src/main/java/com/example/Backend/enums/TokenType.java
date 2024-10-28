package com.example.Backend.enums;

import lombok.Getter;

@Getter
public enum TokenType {
    ACCESS_TOKEN("access"),
    RESET_TOKEN("reset"),
    REFRESH_TOKEN("refresh");

    TokenType(String name) {
        this.name = name;
    }

    private final String name;
}
