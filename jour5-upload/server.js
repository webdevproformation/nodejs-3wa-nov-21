// npm init --yes 
// npm i express multer 

const express = require("express");
const PORT = process.env.PORT || 3210
const app = express()

app.post("/" , (req, rep) => {
    rep.json("hello")
})

app.listen(PORT , () => {console.log("express start sur port " + PORT) }) 