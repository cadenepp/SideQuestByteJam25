package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.User;

public interface UserService {

    void createUser(User user);
    User findUserById(Long id);
}
