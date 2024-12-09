const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

//import routes
const TinaRoute = require('./routes/tina')

//Middleware
app.use(cors())
app.use(bodyParser.json())

//routes
app.use('/ask-tina', TinaRoute)

//start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
