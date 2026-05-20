package com.team.ai_startup_platform.service;

import com.team.ai_startup_platform.client.GeminiClient;
import com.team.ai_startup_platform.dto.BusinessPlanRequest;
import com.team.ai_startup_platform.dto.IdeaGenerationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {
    private final GeminiClient geminiClient;

    public String generateIdea(IdeaGenerationRequest request) {
        String prompt = """
                Generate a startup idea for:
                
                Industry: %s
                Problem: %s
                Budget: %s
                
                Return:
                Startup Name
                Problem
                Solution
                Revenue Model
                Target Audience
                Tech Stack
                """
                .formatted(
                        request.getIndustry(),
                        request.getProblem(),
                        request.getBudget()
                );
        return geminiClient.generateContent(prompt);
    }

    public String generateBusinessPlan(BusinessPlanRequest request) {
        String prompt = """
            Create a concise startup business plan for:

            %s

            Include only:
            Executive Summary
            Revenue Model
            Go To Market Strategy
            """
                .formatted(request.getStartupIdea());

        return geminiClient.generateContent(prompt);
    }
}
