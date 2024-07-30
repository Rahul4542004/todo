package com.example.todo_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;
    private String username;
}
