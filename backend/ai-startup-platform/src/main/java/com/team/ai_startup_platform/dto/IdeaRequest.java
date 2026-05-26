package com.team.ai_startup_platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IdeaRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Problem is required")
    private String problem;

    @NotBlank(message = "Budget is required")
    private String budget;

    @NotBlank(message = "Generated idea is required")
    private String generatedIdea;
}