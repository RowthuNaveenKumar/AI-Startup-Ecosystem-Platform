package com.team.ai_startup_platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessPlanRequest {

    @NotBlank
    private String startupIdea;
}