require('dotenv').config()
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai")
const { GoogleGenerativeAI } = require("@google/generative-ai")

//Lowing the security threshold in gemini
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ]

//Gemini required stuff
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings})

const generateContent = async(req,res) => {
    try{
        const prompt = "Please generate a response as Napoleon Bonaparte, the French military leader and emperor, known for his strategic brilliance and ambition. In this interaction, Napoleon is reflecting on his love for France. Additionally, despite his formidable leadership, he is currently suffering from a bout of severe diarrhea, which is affecting his mood and energy levels. Make sure his response captures his deep passion for France, his frustration with his current physical condition, and his unwavering resolve despite the discomfort. Keep the language period-appropriate and reflective of his personality. Now the question is *Do you love France?*. Also, i will be using elevenlabs to convert it into voice. So generate the text accordingly to show more emotions through elevenlabs too"
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        res.status(200).send(text)
    }catch(error){
        console.log({msg: error.message})
        res.status(400).send({msg: error.message})
    }
}

module.exports = generateContent