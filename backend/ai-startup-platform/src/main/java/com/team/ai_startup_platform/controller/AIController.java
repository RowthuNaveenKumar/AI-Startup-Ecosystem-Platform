package com.team.ai_startup_platform.controller;

import com.team.ai_startup_platform.dto.BusinessPlanRequest;
import com.team.ai_startup_platform.dto.IdeaGenerationRequest;
import com.team.ai_startup_platform.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIController {
    private final AIService aiService;

    @PostMapping("/generate-idea")
    public Map<String,String> generateIdea(
            @Valid @RequestBody IdeaGenerationRequest request
            ){
        String result= aiService.generateIdea(request);

        return Map.of("generatedIdea", result);
    }

    @PostMapping("/generate-business-plan")
    public Map<String,String> generateBusinessPlan(
            @Valid @RequestBody BusinessPlanRequest request
            ){
        String result= aiService.generateBusinessPlan(request);

        return Map.of("businessPlan", result);
    }
}
