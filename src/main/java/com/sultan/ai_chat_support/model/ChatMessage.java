package com.sultan.ai_chat_support.model;

public class ChatMessage {
    private String message;

    public ChatMessage() {
    }

    public ChatMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}