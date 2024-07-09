package com.example.todo_management.security;

import com.example.todo_management.entity.User;
import com.example.todo_management.exception.TodoNotFoundException;
import com.example.todo_management.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CustomUserDetails implements UserDetailsService {
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail).
                orElseThrow(() -> new TodoNotFoundException(usernameOrEmail + " doesn't exist"));

        Set<GrantedAuthority> authorities = user.getRoles().stream().
                map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(
                usernameOrEmail,
                user.getPassword(),
                authorities
        );
    }
    public String getUsername(String usernameOrEmail) throws UsernameNotFoundException{
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail).
                orElseThrow(() -> new TodoNotFoundException(usernameOrEmail + " doesn't exist"));
        return user.getUsername();
    }
}
