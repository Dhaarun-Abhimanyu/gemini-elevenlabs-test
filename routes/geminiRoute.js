const express = require('express')
const {
    generateContent,
} = require('../controllers/geminiController.js')

const router = express.Router()

router.get('/', generateContent)

module.exports = router