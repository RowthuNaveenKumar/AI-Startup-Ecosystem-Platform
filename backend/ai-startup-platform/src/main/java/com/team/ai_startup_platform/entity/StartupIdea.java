package com.team.ai_startup_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "startup_ideas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StartupIdea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String industry;

    private String problem;

    private String budget;

    @Column(columnDefinition = "TEXT")
    private String generatedIdea;

    @Column(columnDefinition = "TEXT")
    private String businessPlan;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}