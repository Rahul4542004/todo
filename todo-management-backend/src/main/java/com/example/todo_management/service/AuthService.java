package com.example.todo_management.service;

import com.example.todo_management.dto.JwtAuthResponseDto;
import com.example.todo_management.dto.LoginDto;
import com.example.todo_management.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponseDto login(LoginDto loginDto);
}
