package com.example.SideQuestBackEnd.services;

import com.example.SideQuestBackEnd.models.Quest;
import com.example.SideQuestBackEnd.models.Slide;
import com.example.SideQuestBackEnd.models.User;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class QuestService {

    @Value("$(api.key)")
    String apiKey;

    private final SessionService sessionService;

    public QuestService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    Long user_id;
    String name;
    String hat;
    String shirt;
    String pants;
    String shoes;
    String overallCulture;


    // TODO: fill in value for each clothing item with actual tied behind value
    // where we pull user Entity data
    public void pullUserInfo(String sessionId, User user) {
        user_id = user.getId();
        name = user.getName();


        String tempHat = user.getHat();
        if (tempHat.equals("JapaneseHat")) {
            hat = "A hat that is oddly shaped like a Samurai Helmet from back in ancient times";
        } else if (tempHat.equals("AmericanHat")) {
            hat = "Despite it not being hair and a mustache, it still represents one of the greatest Americans";
        } else if (tempHat.equals("GermanHat")) {
            hat = "A hat that the greatest of alcoholics wear in October to get drunker than ever";
        } else if (tempHat.equals("MexicanHat")) {
            hat = "Some of the greatest Southern American music artists wear fancy hats like these";
        }


        String tempShirt = user.getShirt();
        if (tempShirt.equals("Japanese shirt")) {
            shirt = "This might be the heaviest shirt than any Japanese person has worn. Because it's armor";
        } else if (tempShirt.equals("American shirt")) {
            shirt = "America has culture in all the small places, especially in a blue color job like this";
        } else if (tempShirt.equals("German shirt")) {
            shirt = "No one can wear suspenders like you or the great drunks of the East in Europe";
        } else if (tempShirt.equals("Mexican shirt")) {
            shirt = "One of the most snazziest shirts you can ever wear especially in the occasion of music";
        }



        String tempPants = user.getPants();
        if (tempPants.equals("JapanesePants")) {
            pants = "I'll be honest, these aren't really pants. It's a waist cape armor. We lied to you";
        } else if (tempPants.equals("AmericanPants")) {
            pants = "I mean, it's most literally just a pair of jeans I don't know what you expected";
        } else if (tempPants.equals("GermanPants")) {
            pants = "Germans wear the oddest pants while they get drunk, especially with how short they are";
        } else if (tempPants.equals("MexicanPants")) {
            pants = "The pants are as fancy as anything else but Mariachi still love to wear them";
        }


        String tempShoes = user.getShoes();
        if (tempShoes.equals("JapaneseShoes")) {
            shoes = "It's hard to believe many Japanese Samurais walked around in boots like these";
        } else if (tempShoes.equals("AmericanShoes")) {
            shoes = "Only the most advanced of steel toe boot to protect you from breaking your toes";
        } else if (tempShoes.equals("GermanShoes")) {
            shoes = "Why are they made entirely out of wood if you're going to walk around drunk in them";
        } else if (tempShoes.equals("MexicanShoes")) {
            shoes = "These are the single most fancy pair of boots you can equip on your character";
        }


        overallCulture = user.getOverallCulture();

        try {
            generateQuest(sessionId);
        } catch (Exception e) {
            System.out.println("Error calling generateQuest");
        }
    }


    private void generateQuest(String sessionId) throws IOException, InterruptedException {

        // call AI
        // Fireworks endpoint
        URI uri = URI.create("https://api.fireworks.ai/inference/v1/chat/completions");
        HttpClient client = HttpClient.newHttpClient();

        // fill in prompt for AI
        // Build your long prompt
        String prompt = """
            You are a clever, imaginative, and funny storywriter for a randomized storytelling game called "Random SideQuest."
   
                    Your task is to generate a JSON object with this exact structure:
        
                    {
                      "monologue": {
                        "text": "A short narrative introduction (4–6 sentences) explaining the situation or world the player is in. Include context about their character, outfit, and culture in a fun and immersive way."
                      },
                      "slides": [
                        {
                          "id": 1,
                          "text": "Scene description, what the player encounters first.",
                          "decisions": [
                            {
                              "text": "First decision (obviously the correct or heroic choice).",
                              "answer": 1
                            },
                            {
                              "text": "Second decision (obviously the wrong or cowardly choice).",
                              "answer": 0
                            }
                          ]
                        },
                        {
                          "id": 2,
                          "text": "Second scene, advancing the story with a twist or new challenge.",
                          "decisions": [
                            {
                              "text": "Choice that shows wisdom or courage (correct).",
                              "answer": 1
                            },
                            {
                              "text": "Choice that shows fear or greed (incorrect).",
                              "answer": 0
                            }
                          ]
                        },
                        {
                          "id": 3,
                          "text": "Third scene, something mysterious or magical happens.",
                          "decisions": [
                            {
                              "text": "Smart or kind decision (correct).",
                              "answer": 1
                            },
                            {
                              "text": "Selfish or reckless decision (wrong).",
                              "answer": 0
                            }
                          ]
                        },
                        {
                          "id": 4,
                          "text": "Final boss or climactic encounter. This scene should feel epic and slightly more difficult, where both options could seem valid but one is clearly better if the player thinks carefully.",
                          "decisions": [
                            {
                              "text": "The wise, brave, or strategic final choice (correct).",
                              "answer": 1
                            },
                            {
                              "text": "The impulsive or fearful final choice (wrong).",
                              "answer": 0
                            }
                          ]
                        }
                      ]
                    }
        
                    **Story Requirements:**
                    - Each story must be completely random and original each time.
                    - The “monologue” must tie the adventure to the player’s appearance and background using these variables:""" +  user_id + ", " + name + ", " + hat + ", " + shirt + ", " + pants + ", " + shoes + ", " +  overallCulture + "is my over all culture theme." + """

                    - Weave these attributes naturally into the storytelling (e.g., “With your bright red hat and desert nomad garb, you stand out among the jungle ruins…”).
                    - The story should feel like a whimsical RPG side quest: short, entertaining, and with a sense of humor.
                    - The correct choices should be fairly clear except for the final slide, which should require some moral or strategic thinking.
                    - Do not include any text outside of the JSON structure.
        
                    **Your output must be valid JSON.**
       
            """;

        // Properly escape quotes and newlines in the prompt
        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n");

        // JSON payload with your deployed model
        String json = """
        {
          "model": "accounts/cadenepp24/deployedModels/llama-sidequest-ag-fr-ols8t7iw",
          "max_tokens": 4000,
          "top_p": 1,
          "top_k": 40,
          "presence_penalty": 0,
          "frequency_penalty": 0,
          "temperature": 0.7,
          "messages": [
            {
              "role": "user",
              "content": "%s"
            }
          ]
        }
        """.formatted(escapedPrompt);

        // Build HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        // Send request
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        // Print result
        System.out.println("Response code: " + response.statusCode());

        if (response.statusCode() != 200) {
            System.out.println("Error: " + response.body());
            return;
        }

        // Parse Fireworks response
        JSONObject responseJson = new JSONObject(response.body());
        JSONArray choices = responseJson.getJSONArray("choices");
        JSONObject message = choices.getJSONObject(0).getJSONObject("message");
        String content = message.getString("content").trim();

        // Try to extract valid JSON from the string
        int start = content.indexOf("{");
        int end = content.lastIndexOf("}");
        if (start >= 0 && end > start) {
            String jsonPart = content.substring(start, end + 1);

            try {
                JSONObject storyJson = new JSONObject(jsonPart);
                System.out.println("\n=== Parsed Story JSON ===");
                System.out.println(storyJson.toString(2));
            } catch (Exception e) {
                System.out.println("Failed to parse JSON. Raw content:");
                System.out.println(content);
                e.printStackTrace();
            }
        } else {
            System.out.println("No JSON found in response:");
            System.out.println(content);
        }



        Quest quest = new Quest();
        // TODO: receive JSON from AI and parse into 'Quest' object
        // TODO: parse for each object in JSON array, create 'Slide' object
        // TODO: add 'Slide' object(s) to Quest.Slides ArrayList<Slide>


        // add to session service
        sessionService.startSession(sessionId, quest);

    }


    // TODO: business logic for getting back  **calling sessionService**\

    // TODO: monologue
    public String getMonologue(String sessionId) {
        Quest quest = sessionService.getSession(sessionId);
        return "";
    }

    // TODO: slide 1
    public Slide getSlideOne(String sessionId) {
        Quest quest = sessionService.getSession(sessionId);
        return null;
    }

    // TODO: slide 2
    public Slide getSlideTwo(String sessionId) {
        Quest quest = sessionService.getSession(sessionId);
        return null;
    }

    // TODO: slide 3
    public Slide getSlideThree(String sessionId) {
        Quest quest = sessionService.getSession(sessionId);
        return null;
    }

    // TODO: slide 4
    public Slide getSlideFour(String sessionId) {
        Quest quest = sessionService.getSession(sessionId);
        return null;
    }


}
