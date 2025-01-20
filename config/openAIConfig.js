
const { OpenAI } = require('langchain/openai');

const openAI = new OpenAI({
  openai_api_key: process.env.OPENAI_API_KEY,
});

module.exports = { openAI };
