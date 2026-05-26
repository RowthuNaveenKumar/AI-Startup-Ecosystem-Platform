package com.team.ai_startup_platform.repository;

import com.team.ai_startup_platform.entity.StartupIdea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StartupIdeaRepository extends JpaRepository<StartupIdea,Long> {
    List<StartupIdea> findByUserId(Long userId);
}
