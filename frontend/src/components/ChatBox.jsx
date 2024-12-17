import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './ChatBox.module.css'

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [sessionInitialized, setSessionInitialized] = useState(false)

  // Function to initialize the AI chat session
  const initializeSession = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/ask-tina', {
        resetSession: true, // Reset the session
      })
      const initialMessage = { sender: 'Tina', text: response.data.aiResponse }
      setMessages([initialMessage]) // Add Tina's greeting message
      setSessionInitialized(true)
    } catch (error) {
      console.error('Error initializing AI session:', error.message)
      alert('Failed to start AI session. Please try again.')
    }
  }

  // Function to handle user messages and send them to the backend
  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    //Add user message to the chat box
    const userMessage = { sender: 'user', text: userInput }
    setMessages((prev) => [...prev, userMessage])

    try {
      //POST request to the backend
      const response = await axios.post(
        'http://localhost:5001/api/tina-response',
        {
          userResponse: userInput,
        }
      )

      //Add Tina's response to the chat box
      const aiMessage = { sender: 'Tina', text: response.data.aiResponse }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error communicating with Tina:', error)
      //Add error message to the chat box
      const errorMessage = {
        sender: 'Tina',
        text: 'Sorry, something went wrong. Please try again.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
    //Clear the user input field
    setUserInput('')
  }

  //Initialize the session on first render
  useEffect(() => {
    if (!sessionInitialized) {
      initializeSession()
    }
  }, [sessionInitialized])

  return (
    <div className={styles['chat-container']}>
      <div className={styles['chat-box']}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles['message']} ${
              message.sender === 'user'
                ? styles['user-message']
                : styles['tina-message']
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles['input-area']}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatBox
