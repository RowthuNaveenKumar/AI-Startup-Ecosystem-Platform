package com.team.ai_startup_platform.service;

import com.team.ai_startup_platform.dto.GroqRequest;
import com.team.ai_startup_platform.dto.GroqResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateContent(String prompt) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        GroqRequest request = new GroqRequest(
                model,
                List.of(
                        new GroqRequest.Message("user", prompt)
                )
        );

        HttpEntity<GroqRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<GroqResponse> response =
                restTemplate.exchange(
                        apiUrl,
                        HttpMethod.POST,
                        entity,
                        GroqResponse.class
                );

        return response.getBody()
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}