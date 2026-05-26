package com.team.ai_startup_platform.service;

import com.team.ai_startup_platform.dto.BusinessPlanRequest;
import com.team.ai_startup_platform.dto.IdeaGenerationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {

    private final GroqService groqService;

    public String generateIdea(IdeaGenerationRequest request) {
        String prompt = """
                You are an expert startup innovation consultant.
                
                Generate a startup idea based on:
                
                Industry: %s
                Problem Statement: %s
                Budget Level: %s
                
                IMPORTANT:
                Return response in CLEAN MARKDOWN FORMAT.
                
                Use EXACT structure below:
                
                # Startup Name
                One startup name only
                
                # One-Line Pitch
                One concise sentence
                
                # Problem Overview
                - 3 bullet points
                
                # Proposed Solution
                - 3 to 5 bullet points
                
                # Target Audience
                - Bullet points
                
                # Key Features
                - Bullet points
                
                # Market Opportunity
                - Short bullet points
                
                # Basic Tech Stack
                - Frontend:
                - Backend:
                - Database:
                - AI/Tools:
                
                # MVP Features
                - Bullet points
                
                # Final Idea Summary
                Short founder-friendly conclusion
                
                RULES:
                - NO giant paragraphs
                - Use markdown headings only
                - Use short readable bullets
                - Make output visually scannable
                - Professional startup founder tone
                - Practical and realistic startup idea
                - Do NOT include business plan
                - Do NOT include revenue model
                - Do NOT include marketing strategy
                - Do NOT include investment planning
                """
                .formatted(
                        request.getIndustry(),
                        request.getProblem(),
                        request.getBudget()
                );

        return groqService.generateContent(prompt);
    }

    public String generateBusinessPlan(BusinessPlanRequest request) {
        String prompt = """
                You are an expert startup consultant and investor pitch advisor.
                
                Create an investor-ready business plan for this startup idea:
                
                Startup Idea:
                %s
                
                IMPORTANT:
                Return the response in CLEAN MARKDOWN FORMAT.
                
                Use EXACT structure below:
                
                # Executive Summary
                - 3 concise bullet points
                
                # Problem
                - Bullet points
                
                # Solution
                - Bullet points
                
                # Target Audience
                - Bullet points
                
                # Business Objectives
                - Bullet points
                
                # Revenue Model
                - Bullet points
                
                # Go-To-Market Strategy
                - Bullet points
                
                # Marketing Strategy
                - Bullet points
                
                # Competitive Advantage
                - Bullet points
                
                # Operations Plan
                - Bullet points
                
                # Financial Projection
                - Year 1:
                - Year 2:
                - Year 3:
                
                # Risks
                - Bullet points
                
                # 90-Day Execution Roadmap
                Week 1-4:
                - Bullet points
                
                Week 5-8:
                - Bullet points
                
                Week 9-12:
                - Bullet points
                
                # Success Metrics
                - Bullet points
                
                # Final Recommendation
                - Short conclusion
                
                RULES:
                - NO giant paragraphs
                - Use short readable bullet points
                - Make it visually scannable
                - Professional startup founder tone
                - Investor-friendly suggestions
                - Practical and realistic recommendations
                - Clean markdown headings only
                """
                .formatted(request.getStartupIdea());

        return groqService.generateContent(prompt);
    }
}