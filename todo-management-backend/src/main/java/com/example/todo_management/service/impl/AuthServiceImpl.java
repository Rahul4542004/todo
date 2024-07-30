package com.example.todo_management.service.impl;

import com.example.todo_management.dto.JwtAuthResponseDto;
import com.example.todo_management.dto.LoginDto;
import com.example.todo_management.dto.RegisterDto;
import com.example.todo_management.entity.Role;
import com.example.todo_management.entity.User;
import com.example.todo_management.exception.TodoApiException;
import com.example.todo_management.repository.RoleRepository;
import com.example.todo_management.repository.UserRepository;
import com.example.todo_management.security.JwtTokenProvider;
import com.example.todo_management.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;


@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;
    @Override
    public String register(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername()))
            throw new TodoApiException(HttpStatus.BAD_REQUEST,"Username already exists!!!");
        if(userRepository.existsByEmail(registerDto.getEmail()))
            throw new TodoApiException(HttpStatus.BAD_REQUEST,"Email already exists!!!");
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setName(registerDto.getName());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setUsername(registerDto.getUsername());

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        return "User successfully registered";
    }

    @Override
    public JwtAuthResponseDto login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsernameOrEmail(),
                        loginDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateJwtToken(authentication);
        JwtAuthResponseDto responseDto = new JwtAuthResponseDto();
        Optional<User> user = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),loginDto.getUsernameOrEmail());
        String role = null;
        if(user.isPresent()){
            User currentUser = user.get();
            responseDto.setUsername(currentUser.getUsername());
            Optional<Role> userRole = currentUser.getRoles().stream().findFirst();
            if(userRole.isPresent()){
                Role uRole = userRole.get();
                role = uRole.getName();
            }
        }
        responseDto.setAccessToken(token);
        responseDto.setRole(role);
        return responseDto;
    }

}
