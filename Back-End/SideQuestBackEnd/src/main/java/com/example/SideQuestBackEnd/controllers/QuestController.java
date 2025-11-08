package com.example.SideQuestBackEnd.controllers;

import com.example.SideQuestBackEnd.models.NonSucUser;
import com.example.SideQuestBackEnd.models.Slide;
import com.example.SideQuestBackEnd.repositories.NonSucUserRepository;
import com.example.SideQuestBackEnd.services.QuestService;
import com.example.SideQuestBackEnd.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
public class QuestController {


    @Autowired
    private QuestService questService;

    @Autowired
    private NonSucUserRepository nonSucUserRepository;

    @Autowired
    private SessionService sessionService;


    // GET - /api/quest/monologue/{sessionId}
    @GetMapping("/api/quest/monologue/{sessionId}")
    public ArrayList<String> getMonologue(@PathVariable String sessionId) {
        return questService.getMonologue(sessionId);
    }


    // GET - /api/quest/slide1/{sessionId}
    @GetMapping("/api/quest/slide1/{sessionId}")
    public Slide getSlideOne(@PathVariable String sessionId) {
        return questService.getSlideOne(sessionId);
    }


    // GET - /api/quest/slide2/{sessionId}
    @GetMapping("/api/quest/slide2/{sessionId}")
    public Slide getSlideTwo(@PathVariable String sessionId) {
        return questService.getSlideTwo(sessionId);
    }


    // GET - /api/quest/slide3/{sessionId}
    @GetMapping("/api/quest/slide3/{sessionId}")
    public Slide getSlideThree(@PathVariable String sessionId) {
        return questService.getSlideThree(sessionId);
    }


    // GET - /api/quest/slide4/{sessionId}
    @GetMapping("/api/quest/slide4/{sessionId}")
    public Slide getSlideFour(@PathVariable String sessionId) {
        return questService.getSlideFour(sessionId);
    }


    // POST - /api/quest/die
    @PostMapping("/api/quest/die/{user_id}/{timeInSeconds}/{sessionId}")
    public void die(@PathVariable Long user_id, @PathVariable int timeInSeconds, @PathVariable String sessionId) {
        sessionService.endSession(sessionId);
        NonSucUser nonSucUser = new NonSucUser(user_id, timeInSeconds);
        nonSucUserRepository.save(nonSucUser);
    }

}
