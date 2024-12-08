# M4-Insurance-Recommendation-App
An application that chats with a user and then recommends the most suitable insurance policy based on the attributes of the users.

## Overview
The Insurance Recommendation Application is a web-based chatbot that uses generative AI to recommend the most suitable insurance policies for users. The chatbot, named Tina, interacts with users through a conversational interface, gathers their requirements, and suggests relevant insurance policies based on predefined business rules.

## Features
* **Dynamic Conversation**: Tina interacts with users to collect information and provide recommendations. <br>
* **AI-Powered Responses**: Utilizes Google Gemini API (or OpenAI GPT-4) for generating intelligent and context-aware responses. <br>
* **Business Rule Validation**: Policies are recommended based on rules: <br>
  - Mechanical Breakdown Insurance (MBI) is unavailable for trucks and racing cars. <br>
  - Comprehensive Car Insurance is only available for vehicles less than 10 years old. <br>
  - Third-Party Car Insurance: Available for all vehicles. <br>
* **User-Friendly Interface**: Built with React for a seamless chat experience. <br>
* **Modular Backend**: Built with Node.js and Express for easy scalability and maintainability. <br>

## Tech Stack 
**Frontend** <br>
Framework: React <br>
Styling: CSS <br>
HTTP Client: Axios <br>
**Backend** <br>
Framework: Node.js with Express <br>
AI Integration: Google Gemini API (or OpenAI GPT-4) <br>
Other Tools: Body-parser, CORS, Axios <br>
