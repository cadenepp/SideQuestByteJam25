package com.example.SideQuestBackEnd.models;

import lombok.Data;

import java.util.List;

@Data
public class Quest {

    private Long user_id;
    private String overall_culture;
    private String user_name;
    private String monologue;
    private List<Slide> slides;

    // appender for List of Slides
    public void addSlide(Slide slide) {
        slides.add(slide);
    }

}
