const { ElevenLabsClient, play} = require('elevenlabs')
require('dotenv').config()

const elevenlabs = new ElevenLabsClient({
    apiKey:"sk_c0dad231c25ba62c0abbd71f7a52f6ee691bcf60bc124be3"
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