package com.team.ai_startup_platform.service;

import com.team.ai_startup_platform.dto.LoginRequest;
import com.team.ai_startup_platform.dto.RegisterRequest;
import com.team.ai_startup_platform.entity.User;
import com.team.ai_startup_platform.exception.DuplicateResourceException;
import com.team.ai_startup_platform.exception.ResourceNotFoundException;
import com.team.ai_startup_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public String register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new DuplicateResourceException("Email already registered");
        }
        User user=User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    public User login(LoginRequest request){
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->
                        new ResourceNotFoundException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
}
