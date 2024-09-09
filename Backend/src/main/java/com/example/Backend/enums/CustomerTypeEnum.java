package com.example.Backend.enums;

import lombok.Getter;

@Getter
public enum CustomerTypeEnum {
    BRONZE("Đồng"),
    SILVER("Bạc"),
    GOLD("Vàng"),
    ;

    CustomerTypeEnum(String name) {
        this.name = name;
    }

    private final String name;
}
