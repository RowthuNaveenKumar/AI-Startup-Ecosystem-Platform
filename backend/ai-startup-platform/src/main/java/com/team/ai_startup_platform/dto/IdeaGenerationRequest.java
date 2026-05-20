package com.team.ai_startup_platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IdeaGenerationRequest {

    @NotBlank
    private String industry;

    @NotBlank
    private String problem;

    @NotBlank
    private String budget;
}