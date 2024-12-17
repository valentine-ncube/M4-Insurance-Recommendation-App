const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()
const app = express()

//Middleware
app.use(cors()) // app.use(bodyParser.json())
app.use(express.json())

// Initialize chatSession as null
let chatSession = null

//Function to initialize the Google Generative AI model
async function initializeGenerativeAI(prompt) {
  try {
    if (!process.env.API_KEY) {
      throw new Error('API key is missing in environment variables.')
    }

    const genAi = new GoogleGenerativeAI(process.env.API_KEY)
    const model = await genAi.getGenerativeModel({
      model: 'gemini-1.5-flash', // Use Gemini for quick responses
      systemInstruction: prompt,
    })
    return model
  } catch (error) {
    console.error('❌ Error initializing AI model:', error)
    throw new Error('Failed to initialize AI model.')
  }
}

// Route to start the insurance chatbot session
app.post('/api/ask-tina', async (req, res) => {
  const { resetSession } = req.body

  // Insurance-specific prompt
  const prompt = `
    You are Tina, an experienced insurance consultant. Your task is to recommend the best insurance policy to users based on their vehicle type and age.
    - Policies: 
      1. Mechanical Breakdown Insurance (MBI): Not available for trucks and racing cars.
      2. Comprehensive Car Insurance: Available only for vehicles less than 10 years old.
      3. Third Party Car Insurance: Available for all vehicles.
    - Start by asking for vehicle type and vehicle age step-by-step.
    - Analyze user responses and dynamically adjust your questions and suggestions.
    - Keep the tone professional, conversational, and friendly.
    - After gathering enough information, recommend one or more policies with reasons.
  `

  try {
    if (!chatSession || resetSession) {
      const model = await initializeGenerativeAI(prompt)
      chatSession = model.startChat({ history: [] })
    }

    // Send an initial message to the user
    const initialResponse = `Hello! I’m Tina, your insurance assistant. May I ask you a few questions to recommend the best insurance policy for you?`
    res.json({ aiResponse: initialResponse })
  } catch (error) {
    console.error('❌ Error in initializing chat session:', error)
    res.status(500).json({ error: 'Failed to initialize chat session.' })
  }
})

// Route to handle user responses and provide AI responses
app.post('/api/tina-response', async (req, res) => {
  const { userResponse } = req.body

  try {
    if (!chatSession) {
      return res.status(400).json({
        error: 'Chat session is not initialized. Start a new session first.',
      })
    }

    if (!userResponse) {
      return res.status(400).json({
        error: 'User response is required.',
      })
    }

    // Send user input to the AI session
    const result = (await chatSession.sendMessage(userResponse)).response
    let aiResponse = result.text()

    res.json({ aiResponse })
  } catch (error) {
    console.error('❌ Error in getting AI response:', error.message)
    res
      .status(500)
      .json({ error: 'Failed to get AI response.', details: error.message })
  }
})

// Root route to check server status
app.get('/', (req, res) => {
  res.send('Tina the Insurance Assistant is ready to help! ')
})

// 404 handler
app.use((req, res) => {
  res.status(404).send('Endpoint not found')
})

//start server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
