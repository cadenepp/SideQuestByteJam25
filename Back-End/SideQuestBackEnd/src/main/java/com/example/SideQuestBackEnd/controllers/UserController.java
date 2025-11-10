package com.example.SideQuestBackEnd.controllers;

import com.example.SideQuestBackEnd.models.User;
import com.example.SideQuestBackEnd.services.QuestService;
import com.example.SideQuestBackEnd.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private QuestService questService;


    @PostMapping("/api/User")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userServiceImpl.createUser(user);
        String sessionId = UUID.randomUUID().toString();
        System.out.println(sessionId);
        questService.pullUserInfo(sessionId, user);
        return ResponseEntity.ok(sessionId);
    }


    @GetMapping("/api/User/{id}")
    public User findUserById(@PathVariable("id") Long id) {
        return userServiceImpl.findUserById(id);
    }

}
