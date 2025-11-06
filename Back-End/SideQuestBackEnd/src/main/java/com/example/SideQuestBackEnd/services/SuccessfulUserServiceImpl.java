package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.SuccessfulUser;
import com.example.SideQuestBackEnd.repositories.SuccessfulUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuccessfulUserServiceImpl implements SuccessfulUserService {

    @Autowired
    public SuccessfulUserRepository successfulUserRepository;

    @Override
    public void createSuccessfulUser(SuccessfulUser successfulUser) {
        successfulUserRepository.save(successfulUser);
    }

    @Override
    public Iterable<SuccessfulUser> findAll() {
        return successfulUserRepository.findAll();
    }
}
