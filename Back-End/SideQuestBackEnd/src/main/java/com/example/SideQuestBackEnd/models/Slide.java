package com.example.SideQuestBackEnd.models;

import lombok.Data;

@Data
public class Slide {
    private String text;
    private String choiceOne;
    private int answerOne;
    private String choiceTwo;
    private int answerTwo;
}
