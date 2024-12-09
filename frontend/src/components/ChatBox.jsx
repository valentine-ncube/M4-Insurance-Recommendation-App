import React, { useState } from 'react'
import axios from 'axios'
import styles from './ChatBox.module.css'

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    //Add user message to the chat box
    const userMessage = { sender: 'user', text: userInput }
    setMessages((prev) => [...prev, userMessage])

    try {
      //POST request to the backend
      const response = await axios.post('http://localhost:5000/ask-tina', {
        message: userInput,
        context: messages,
      })

      //Add Tina's response to the chat box
      const aiMessage = { sender: 'Tina', text: response.data.response }
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

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            <strong>{message.sender}</strong>: {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
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
