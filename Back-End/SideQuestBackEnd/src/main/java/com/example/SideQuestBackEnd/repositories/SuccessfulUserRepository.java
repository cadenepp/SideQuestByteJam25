package com.example.SideQuestBackEnd.repositories;

import com.example.SideQuestBackEnd.models.SuccessfulUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuccessfulUserRepository extends CrudRepository<SuccessfulUser, Long> {
    // extra queries go here
}
