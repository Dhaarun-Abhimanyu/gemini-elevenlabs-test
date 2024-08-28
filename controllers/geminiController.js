require('dotenv').config()
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai")
const { GoogleGenerativeAI } = require("@google/generative-ai")

//Lowing the security threshold in gemini
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ]

//Gemini required stuff
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings})

const generateContent = async(req,res) => {
    try{
        const prompt = 'In 5 words, tell any good quote you can think of'
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = await response.text()
        res.status(200).send({msg: text})
    }catch(error){
        console.log({msg: error.message})
        res.status(400).send({msg: error.message})
    }
}
const generateContentReturn = async(req,res) => {
  try{
      const prompt = 'In 5 words, tell any good quote you can think of'
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = await response.text()
      return text;
  }catch(error){
      console.log({msg: error.message})
      res.status(400).send({msg: error.message})
  }
}

module.exports = {
  generateContent,
  generateContentReturn,
}