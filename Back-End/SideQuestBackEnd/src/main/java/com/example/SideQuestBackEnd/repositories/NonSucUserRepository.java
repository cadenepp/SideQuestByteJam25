package com.example.SideQuestBackEnd.repositories;

import com.example.SideQuestBackEnd.models.NonSucUser;
import org.springframework.data.repository.CrudRepository;

public interface NonSucUserRepository extends CrudRepository<NonSucUser, Long> {
    // extra queries go here
}
