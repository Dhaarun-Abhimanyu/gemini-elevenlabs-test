const { ElevenLabsClient, play} = require('elevenlabs')
require('dotenv').config()

const elevenlabs = new ElevenLabsClient({
    apiKey: `${process.env.ELEVENLABS_API_KEY}`
})

const generateGeminiAudio = async(generated_text) => {
    try{
        const audio = await elevenlabs.generate({
            voice: "Arnold",
            text: generated_text,
            model_id: "eleven_multilingual_v2"
        })
        await play(audio)
        return(audio.data)
    }catch(error){
        console.log({audio: error.message})
    }
}

module.exports = {
    generateGeminiAudio,
}