package com.team.ai_startup_platform.controller;

import com.team.ai_startup_platform.dto.IdeaRequest;
import com.team.ai_startup_platform.dto.IdeaResponse;
import com.team.ai_startup_platform.service.StartupIdeaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ideas")
@RequiredArgsConstructor
public class StartupIdeaController {

    private final StartupIdeaService startupIdeaService;

    @GetMapping("/{id}")
    public IdeaResponse getIdeaById(@PathVariable Long id) {
        return startupIdeaService.getIdeaById(id);
    }

    @PostMapping
    public Map<String,String> saveIdea(
            @Valid @RequestBody IdeaRequest request
            ){
        String message = startupIdeaService.saveIdea(request);
        return Map.of("message",message);
    }

    @GetMapping
    public List<IdeaResponse> getIdeas(
            @RequestParam Long userId
    ){
        return startupIdeaService.getIdeasByUser(userId);
    }

    @DeleteMapping("/{id}")
    public Map<String,String> deleteIdea(
            @PathVariable Long id
    ){
        String message= startupIdeaService.deleteIdea(id);

        return Map.of("message",message);
    }

    @PutMapping("/{id}")
    public Map<String, String> updateIdea(
            @PathVariable Long id,
            @Valid @RequestBody IdeaRequest request
    ) {
        String message = startupIdeaService.updateIdea(id, request);

        return Map.of("message", message);
    }

    @PutMapping("/{id}/business-plan")
    public Map<String, String> saveBusinessPlan(
            @PathVariable Long id,
            @RequestBody Map<String, String> request
    ) {
        String message = startupIdeaService.saveBusinessPlan(
                id,
                request.get("businessPlan")
        );

        return Map.of("message", message);
    }
}
