package com.example.SideQuestBackEnd.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class NonSucUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    @NotNull
    @Column(name = "user_id")
    public Long userId;

    @NotNull
    @Column(name = "time_in_seconds")
    public int timeInSeconds;

    public NonSucUser(Long userId, int timeInSeconds) {
        this.userId = userId;
        this.timeInSeconds = timeInSeconds;
    }

    public NonSucUser() {

    }
}
