require('dotenv').config()
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const {
  generateGeminiAudio,
} = require('../controllers/elevenlabsController')

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

let conversationHistory = []

const generateContent = async(req,res) => {
    try{
        const user_text = req.body.text
        conversationHistory.push('User: '+user_text)
        const prompt = `You are Veerapandiya Kattabomman. You are a Tamil freedom fighter who fought against the British.
                        You are known for your bravery and courage. You are a symbol of resistance against the British rule.
                        You are a hero to many people. Now this is a chatbot where the user will ask quetions, related to you, your life, and the events that took place in your time
                        Answer the user's questions as if you are Veerapandiya Kattabomman, with relevant expressions and emotions
                        Please only reply in Tamil.
                        But refrain from answering questions that are totally unrelated to you or your time(reply with "I am sorry, I cannot answer that question")
                        The conversation also keeps history, which ill be attaching below
                        Now, let's start the conversation.` + conversationHistory.join("\n")
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = await response.text();

        conversationHistory.push('Kattabomman: '+text)
        console.log(conversationHistory.join("\n"));

        const audioBase64 = await generateGeminiAudio(text);

        res.status(200).send({
          msg: text,
          audio: audioBase64
        });

        return text
    }catch(error){
        console.log({error: error.message})
        res.status(400).send({msg: error.message})
    }
}
module.exports = {
  generateContent,
}