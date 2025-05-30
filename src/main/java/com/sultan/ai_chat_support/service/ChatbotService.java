package com.sultan.ai_chat_support.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sultan.ai_chat_support.model.ChatResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {
    private static final Logger logger = LoggerFactory.getLogger(ChatbotService.class);

    @Value("${ollama.api.url:http://localhost:11434}")
    private String ollamaApiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ChatbotService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public ChatResponse getResponse(String message) {
        try {
            // First check if Ollama is running
            try {
                ResponseEntity<String> healthCheck = restTemplate.getForEntity(ollamaApiUrl + "/api/tags",
                        String.class);
                if (!healthCheck.getStatusCode().is2xxSuccessful()) {
                    return new ChatResponse(
                            "Error: Ollama service is not responding properly. Please make sure Ollama is running.");
                }
            } catch (RestClientException e) {
                logger.error("Ollama service is not accessible: ", e);
                return new ChatResponse(
                        "Error: Cannot connect to Ollama service. Please make sure Ollama is running on "
                                + ollamaApiUrl);
            }

            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gemma3:1b");
            requestBody.put("prompt", message);
            requestBody.put("stream", false);

            String requestJson = objectMapper.writeValueAsString(requestBody);
            logger.info("Sending request to Ollama: {}", requestJson);

            // Create HTTP entity with headers and body
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            // Make the request
            ResponseEntity<String> response = restTemplate.postForEntity(
                    ollamaApiUrl + "/api/generate",
                    entity,
                    String.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                logger.error("Ollama returned non-200 status code: {}", response.getStatusCode());
                return new ChatResponse(
                        "Error: Ollama service returned an error status code: " + response.getStatusCode());
            }

            String responseBody = response.getBody();
            logger.info("Received response from Ollama: {}", responseBody);

            // Parse the JSON response
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            String generatedText = jsonNode.get("response").asText();

            return new ChatResponse(generatedText);
        } catch (Exception e) {
            logger.error("Error processing request: ", e);
            return new ChatResponse(
                    "Error: " + e.getMessage() + ". Please make sure Ollama is running and the model is installed.");
        }
    }
}