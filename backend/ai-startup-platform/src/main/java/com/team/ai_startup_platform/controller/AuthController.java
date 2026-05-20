package com.team.ai_startup_platform.controller;

import com.team.ai_startup_platform.dto.LoginRequest;
import com.team.ai_startup_platform.dto.RegisterRequest;
import com.team.ai_startup_platform.entity.User;
import com.team.ai_startup_platform.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public Map<String,String> register(
            @Valid @RequestBody RegisterRequest request
            ){
        String message= authService.register(request);
        return Map.of("message", message);
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @Valid @RequestBody LoginRequest request
            ){
        User user=authService.login(request);

        return Map.of(
                "message", "Login successful",
                "userId", user.getId(),
                "name", user.getName()
        );
    }
}
