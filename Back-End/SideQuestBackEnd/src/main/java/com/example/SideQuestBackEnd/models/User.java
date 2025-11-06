package com.example.SideQuestBackEnd.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    @NotBlank
    public String name;

    @NotBlank
    @Column(name = "overall_culture")
    public String overallCulture;

    @NotBlank
    public String hat;

    @NotBlank
    public String shirt;

    @NotBlank
    public String pants;

    @NotBlank
    public String shoes;

}
