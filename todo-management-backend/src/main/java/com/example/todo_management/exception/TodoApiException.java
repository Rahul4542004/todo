package com.example.todo_management.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@AllArgsConstructor
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
@Getter
@Setter
public class TodoApiException extends RuntimeException{
    private HttpStatus httpStatus;
    private String message;
}
