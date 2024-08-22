const express = require('express')
const app = express()
const gemini_route = require('./routes/gemini')
require('dotenv').config()

app.use(express.json())

app.use('/gemini', gemini_route)

app.get('/', (req,res) => {
    res.status(200).json({msg: "Hello World"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})