const express = require('express')
const cors = require("cors")
const bodyparser = require('body-parser')
const cookie = require('cookie-parser')
const blogDb = require('../db/db')
const { router } = require('../routes/router')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const path = require('path');
const port = 5000


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended: true}))

// app.use(express.static(path.join(__dirname, '../../feb')));

// app.get('*', (req, res) => {
//     console.log('Request received:', req.url);
//     res.sendFile(path.join(__dirname, '..', '..', 'feb', 'index.html'));
// });

app.use('/api/user', router)
app.use('/api/blog', router)
app.use('/api/post', router)


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "something went wrong"
    return res.status(statusCode).json(
        statusCode, 
        message
    )
})
blogDb()
app.listen(port, ()=>{
    console.log("app is now listening on port 5000")
})