const { ElevenLabsClient, play} = require('elevenlabs')
require('dotenv').config()

const elevenlabs = new ElevenLabsClient({
    apiKey:"sk_54253f02b2268ee1c8313da65b6fdd67ff2a8c550fb60d0f"
});


const generateGeminiAudio = async (generated_text) => {
    try {
        const audioStream = await elevenlabs.generate({
            voice: "Arnold",
            text: generated_text,
            model_id: "eleven_multilingual_v2",
            stream: true
        });

        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }

        const audioBuffer = Buffer.concat(chunks);
        const audioBase64 = audioBuffer.toString('base64');
        return audioBase64;
    } catch (error) {
        console.error('Error generating audio:', error.message);
        throw error;
    }
};


module.exports = {
    generateGeminiAudio,
}