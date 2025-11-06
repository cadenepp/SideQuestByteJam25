package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.Quest;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {

    private final Map<String, Quest> sessions = new ConcurrentHashMap<>();

    public void startSession(String sessionId, Quest quest) {
        sessions.put(sessionId, quest);
    }

    public Quest getSession(String sessionId) {
        return sessions.get(sessionId);
    }

    public void endSession(String sessionId) {
        sessions.remove(sessionId);
    }
}
