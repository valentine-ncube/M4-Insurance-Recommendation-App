// const axios = require('axios')

// //Get AI response from the API
// const getAIResponse = async (message, context) => {
//   const API_URL = process.env.AI_API_URL
//   const API_KEY = process.env.AI_API_KEY

//   if (!API_URL || !API_KEY) {
//     throw new Error('AI API URL or API Key is not provided.')
//   }

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         prompt: generatePrompt(message, context),
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     )
//     return response.data.text
//   } catch (error) {
//     console.error('Error communicating with the AI service:', error)
//     throw new Error('Failed to get AI response.')
//   }
// }

// //Generate prompt for the AI
// const generatePrompt = (message, context) => {
//   const basePrompt = `Tina is an insurance consultant chatbot. She helps users find suitable insurance policies based on their needs.`
//   const previousMessages = context?.messages
//     ? context.messages.map((msg) => `${msg.sender}: ${msg.text}`).join('\n')
//     : ''

//   return `${basePrompt}\n${previousMessages}\nUser: ${message}\nTina:`
// }
// module.exports = { getAIResponse }
