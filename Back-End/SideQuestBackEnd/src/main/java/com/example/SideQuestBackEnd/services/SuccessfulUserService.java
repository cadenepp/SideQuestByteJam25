package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.SuccessfulUser;

public interface SuccessfulUserService {

    void createSuccessfulUser(SuccessfulUser successfulUser);

    Iterable<SuccessfulUser> findAll();
}
