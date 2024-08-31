const express = require('express')
const {
    generateContent,
} = require('../controllers/geminiController.js')

const router = express.Router()

router.post('/', generateContent)

module.exports = router