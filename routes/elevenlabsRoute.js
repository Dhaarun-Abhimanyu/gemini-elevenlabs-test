const express = require('express')
const {
    generateGeminiAudio,
} = require('../controllers/elevenlabsController.js')

const router = express.Router()

router.get('/', generateGeminiAudio)

module.exports = router