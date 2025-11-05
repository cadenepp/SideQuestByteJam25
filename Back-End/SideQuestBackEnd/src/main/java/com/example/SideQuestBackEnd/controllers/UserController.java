package com.example.SideQuestBackEnd.controllers;

import com.example.SideQuestBackEnd.models.User;
import com.example.SideQuestBackEnd.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/api/User")
    public void createUser(@RequestBody User user) {
        userServiceImpl.createUser(user);
    }

    @GetMapping("api/User/{id}")
    public User findUserById(@PathVariable("id") Long id) {
        return userServiceImpl.findUserById(id);
    }
}
