const { ElevenLabsClient, play} = require('elevenlabs')
require('dotenv').config()
const {
    generateContentReturn,
} = require('../controllers/geminiController.js')

const elevenlabs = new ElevenLabsClient({
    apiKey: `${process.env.ELEVENLABS_API_KEY}`
})

const generateGeminiAudio = async(req,res) => {
    try{
        const text = await generateContentReturn(req,res)
        console.log({gemini_text: text})
        const audio = await elevenlabs.generate({
            voice: "Rachel",
            text: text,
            model_id: "eleven_multilingual_v2"
        })
        await play(audio)
        res.status(200).send(audio.data)
    }catch(error){
        console.log({eleven_msg: error.message})
        res.status(400).send({msg: error.message})
    }
}

module.exports = {
    generateGeminiAudio,
}