package com.example.SideQuestBackEnd.repositories;

import com.example.SideQuestBackEnd.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findUserById(Long id);
    // extra queries go here
}
