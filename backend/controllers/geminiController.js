require('dotenv').config()
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const {
  generateGeminiAudio,
} = require('../controllers/elevenlabsController')
const charactersArray = require('../data/character')


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
        const user_event = req.body.event
        const user_lang = req.body.lang

        const characterData = charactersArray.find(characterObj => characterObj.character === user_event)
        const character_prompt = characterData ? characterData.prompt : "Character not found"

        console.log(character_prompt)

        conversationHistory.push('User: '+user_text)
        const prompt = `You are ${user_event}. ${character_prompt}
                        Extract all information and history about him and his timeline of life and everything about his way of life character and all the things he has done from the internet and think of yourself has him, Now this is a chatbot where the user will ask quetions, related to you, your life, and the events that took place in your time
                        Answer the user's questions as if you are ${user_event}, with relevant expressions and emotions
                        Please only reply in the language ${user_lang}.
                        But refrain from answering questions that are totally unrelated to you or your time(reply with "I am sorry, I cannot answer that question")
                        The conversation also keeps history, which ill be attaching below
                        Now, let's start the conversation.` + conversationHistory.join("\n")
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = await response.text();
        
        conversationHistory.push(text)
        console.log(user_event);

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