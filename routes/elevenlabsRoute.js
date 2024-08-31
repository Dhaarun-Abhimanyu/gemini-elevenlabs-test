const express = require('express')
const {
    generateGeminiAudio,
} = require('../controllers/elevenlabsController.js')

const router = express.Router()

router.post('/', generateGeminiAudio)

module.exports = router