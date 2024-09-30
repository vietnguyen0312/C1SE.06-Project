package com.example.Backend.enums;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    EXISTED(1002, "Existed", HttpStatus.BAD_REQUEST),
    NOT_EXISTED(1003, "Not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1004, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1005, "You do not have permission", HttpStatus.FORBIDDEN),

    PASSWORD_INCORRECT(1999,"Password not correct", HttpStatus.BAD_REQUEST),
    NOT_BLANK(2001, "This field is mandatory", HttpStatus.BAD_REQUEST),
    USERNAME_SIZE(2002, "Username must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    INVALID(2003, "This field is invalid", HttpStatus.BAD_REQUEST),
    MIN_SIZE(2004, "This field must be at least {min} characters long", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_INVALID(2005, "Phone number is invalid", HttpStatus.BAD_REQUEST),
    DOB_PAST(2006, "Date of birth must be a past date", HttpStatus.BAD_REQUEST),
    GENDER_INVALID(2007, "Gender must be Male, Female, or Other", HttpStatus.BAD_REQUEST),
    DATE_FUTURE(2008, "Date must be a future date", HttpStatus.BAD_REQUEST),
    NOT_NULL(2009, "This field must not be null", HttpStatus.BAD_REQUEST),
    POSITIVE(2010, "This field must be greater than 0", HttpStatus.BAD_REQUEST),
    MAX_SIZE(2011, "This field must be at max {max} characters long", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
