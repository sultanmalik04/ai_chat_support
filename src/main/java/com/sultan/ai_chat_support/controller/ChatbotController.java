package com.sultan.ai_chat_support.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sultan.ai_chat_support.model.ChatMessage;
import com.sultan.ai_chat_support.model.ChatResponse;
import com.sultan.ai_chat_support.service.ChatbotService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatMessage message) {
        return chatbotService.getResponse(message.getMessage());
    }
}
