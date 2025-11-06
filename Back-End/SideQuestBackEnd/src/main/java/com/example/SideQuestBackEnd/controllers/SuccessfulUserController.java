package com.example.SideQuestBackEnd.controllers;

import com.example.SideQuestBackEnd.models.SuccessfulUser;
import com.example.SideQuestBackEnd.services.SuccessfulUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class SuccessfulUserController {

    @Autowired
    private SuccessfulUserServiceImpl successfulUserServiceImpl;

    @PostMapping("/api/SuccessfulUser")
    public void createSuccessfulUser(@RequestBody SuccessfulUser successfulUser) {
        successfulUserServiceImpl.createSuccessfulUser(successfulUser);
    }

    @GetMapping("api/SuccessfulUser")
    public Iterable<SuccessfulUser> finaAll() {
        return successfulUserServiceImpl.findAll();
    }

}
