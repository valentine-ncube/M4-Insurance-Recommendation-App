// const express = require('express')
// const { getAIResponse } = require('../services/aiService')

// const router = express.Router()

// //Business rules
// const applyBusinessRules = (inputs) => {
//   const { vehicleType, vehicleAge } = inputs

//   const recommendations = []
//   if (vehicleType !== 'truck' && vehicleType !== 'racing') {
//     recommendations.push('Mechanical Breakdown Insurance')
//   }
//   if (vehicleAge && vehicleAge > 10) {
//     recommendations.push('Comprehensive Car Insurance')
//   }
//   recommendations.push('Third Party Car Insurance')

//   return recommendations
// }

// //Main route
// router.post('/', async (req, res) => {
//   const { message, context } = req.body

//   try {
//     //Get AI response
//     const aiResponse = await getAIResponse(message, context)

//     //Apply business rules
//     const userInputs = context?.userInputs || {}
//     const recommendations = applyBusinessRules(userInputs)

//     //Combine AI response and recommendations
//     res.json = {
//       response: aiResponse,
//       recommendations,
//     }
//   } catch (error) {
//     console.error('Error communicating with Tina:', error)
//     res.status(500).json({ response: 'Failed to process the request.' })
//   }
// })

// module.exports = router
