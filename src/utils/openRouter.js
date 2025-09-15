const axios = require('axios');

const openRouterAPI = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:4028',
    'X-Title': 'AI Chat Application'
  }
});

const sendMessage = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('Sending to OpenRouter:', { message, historyLength: conversationHistory.length });

    const response = await openRouterAPI.post('/chat/completions', {
      model: 'openai/gpt-3.5-turbo', // You can change this to other models like 'meta-llama/llama-3-70b-instruct'
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw new Error('Failed to get response from AI service');
  }
};

module.exports = { sendMessage };