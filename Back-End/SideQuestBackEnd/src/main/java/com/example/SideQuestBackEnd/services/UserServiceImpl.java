package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.User;
import com.example.SideQuestBackEnd.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    public UserRepository userRepository;

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }
}
