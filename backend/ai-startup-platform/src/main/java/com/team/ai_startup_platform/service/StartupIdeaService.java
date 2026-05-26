package com.team.ai_startup_platform.service;

import com.team.ai_startup_platform.dto.IdeaRequest;
import com.team.ai_startup_platform.dto.IdeaResponse;
import com.team.ai_startup_platform.entity.StartupIdea;
import com.team.ai_startup_platform.entity.User;
import com.team.ai_startup_platform.exception.ResourceNotFoundException;
import com.team.ai_startup_platform.repository.StartupIdeaRepository;
import com.team.ai_startup_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StartupIdeaService {
    private final StartupIdeaRepository startupIdeaRepository;
    private final UserRepository userRepository;

    public IdeaResponse getIdeaById(Long id) {
        StartupIdea idea = startupIdeaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Idea not found"));

        return IdeaResponse.builder()
                .id(idea.getId())
                .industry(idea.getIndustry())
                .problem(idea.getProblem())
                .budget(idea.getBudget())
                .generatedIdea(idea.getGeneratedIdea())
                .businessPlan(idea.getBusinessPlan())
                .build();
    }

    public String saveIdea(IdeaRequest request){
        User user=userRepository.findById(request.getUserId())
                .orElseThrow(()->
                        new ResourceNotFoundException("User not found"));

        StartupIdea idea=StartupIdea.builder()
                .industry(request.getIndustry())
                .problem(request.getProblem())
                .budget(request.getBudget())
                .generatedIdea(request.getGeneratedIdea())
                .user(user)
                .build();

        startupIdeaRepository.save(idea);

        return "Idea saved successfully";
    }

    public List<IdeaResponse> getIdeasByUser(Long userId){
        List<StartupIdea> ideas=
                startupIdeaRepository.findByUserId(userId);

        return ideas.stream()
                .map(idea -> IdeaResponse.builder()
                        .id(idea.getId())
                        .industry(idea.getIndustry())
                        .problem(idea.getProblem())
                        .budget(idea.getBudget())
                        .generatedIdea(idea.getGeneratedIdea())
                        .businessPlan(idea.getBusinessPlan())
                        .build())
                .toList();
    }

    public String deleteIdea(Long ideaId){
        StartupIdea idea = startupIdeaRepository.findById(ideaId)
                .orElseThrow(()->   new ResourceNotFoundException("Idea not found"));

        startupIdeaRepository.delete(idea);

        return "Idea deleted successfully";
    }

    public String saveBusinessPlan(Long ideaId, String businessPlan) {
        StartupIdea idea = startupIdeaRepository.findById(ideaId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Idea not found"));

        idea.setBusinessPlan(businessPlan);

        startupIdeaRepository.save(idea);

        return "Business plan saved successfully";
    }

    public String updateIdea(Long ideaId, IdeaRequest request) {
        StartupIdea idea = startupIdeaRepository.findById(ideaId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Idea not found"));

        idea.setIndustry(request.getIndustry());
        idea.setProblem(request.getProblem());
        idea.setBudget(request.getBudget());
        idea.setGeneratedIdea(request.getGeneratedIdea());

        startupIdeaRepository.save(idea);

        return "Idea updated successfully";
    }
}
