const { ChatOpenAI } = require('@langchain/openai');  
const { ChatPromptTemplate } = require('@langchain/core/prompts');  
const { validationResult } = require('express-validator'); 

const Story = require('../models/Story'); 

const openAI = new ChatOpenAI({
  model: "gpt-4o-mini",  
  openai_api_key: process.env.OPENAI_API_KEY,  
});

async function generateStory(prompt) {
  try {
    const systemTemplate = "You are a creative assistant. Write a story based on the following prompt:";

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "{prompt}"],
    ]);

    const promptValue = await promptTemplate.invoke({ prompt });

    const result = await openAI.invoke(promptValue);
    
    return result.content;
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Error generating story");
  }
}

async function createStory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { prompt } = req.body;  
  const user = req.user.userId; 
  
  try {
    const story = await generateStory(prompt);

    const newStory = new Story({ prompt, story,user });
    await newStory.save();

    res.status(200).json({ story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating story" });
  }
}

async function getStories(req, res) {
  try {
    const userId = req.user.userId; 
    const stories = await Story.find({ user: userId });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stories" });
  }
}

module.exports = { createStory, getStories };
