package com.example.SideQuestBackEnd.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class SuccessfulUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    @NotNull
    @Column(name = "user_id")
    public Long userId;

    @NotNull
    @Column(name = "time_in_seconds")
    public int timeInSeconds;

    @NotNull
    public boolean successful;

}
