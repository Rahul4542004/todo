package com.example.todo_management.controller;

import com.example.todo_management.dto.JwtAuthResponseDto;
import com.example.todo_management.dto.LoginDto;
import com.example.todo_management.dto.RegisterDto;
import com.example.todo_management.security.CustomUserDetails;
import com.example.todo_management.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@AllArgsConstructor
public class AuthController {
    private AuthService authService;
    private CustomUserDetails userDetails;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String message = authService.register(registerDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> login(@RequestBody LoginDto loginDto){
        JwtAuthResponseDto token = authService.login(loginDto);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
    @GetMapping("/username")
    public ResponseEntity<String> getUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails user = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername(user.getUsername());
            return ResponseEntity.ok(username);
        } else {
            return ResponseEntity.ok(authentication.getName());
        }
    }
}
