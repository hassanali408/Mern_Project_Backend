
const { ChatOpenAI } = require('@langchain/openai');  

const openAI = new ChatOpenAI({
  model: "gpt-4o-mini",  
  openai_api_key: process.env.OPENAI_API_KEY,  
});
module.exports = { openAI };
