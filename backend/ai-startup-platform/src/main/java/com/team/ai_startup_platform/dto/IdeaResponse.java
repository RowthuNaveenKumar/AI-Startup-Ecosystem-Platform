package com.team.ai_startup_platform.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IdeaResponse {

    private Long id;
    private String industry;
    private String problem;
    private String budget;
    private String generatedIdea;
    private String businessPlan;
}