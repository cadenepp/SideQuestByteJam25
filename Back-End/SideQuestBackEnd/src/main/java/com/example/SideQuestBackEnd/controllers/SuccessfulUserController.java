package com.example.SideQuestBackEnd.controllers;

import com.example.SideQuestBackEnd.models.NonSucUser;
import com.example.SideQuestBackEnd.models.SuccessfulUser;
import com.example.SideQuestBackEnd.services.SessionService;
import com.example.SideQuestBackEnd.services.SuccessfulUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class SuccessfulUserController {

    @Autowired
    private SuccessfulUserServiceImpl successfulUserServiceImpl;

    @Autowired
    private SessionService sessionService;

    @PostMapping("/api/SuccessfulUser/{user_id}/{timeInSeconds}/{sessionId}")
    public void createSuccessfulUser(@PathVariable Long user_id, @PathVariable int timeInSeconds, @PathVariable String sessionId) {
        sessionService.endSession(sessionId);
        SuccessfulUser successfulUser = new SuccessfulUser(user_id, timeInSeconds);
        successfulUserServiceImpl.createSuccessfulUser(successfulUser);
    }

    @GetMapping("api/SuccessfulUser")
    public Iterable<SuccessfulUser> finaAll() {
        return successfulUserServiceImpl.findAll();
    }

}
