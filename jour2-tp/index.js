const express = require("express");
const { connect } = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();
const PORT = process.env.PORT || 3333 ;
const Message = require("./model-message");

connect(process.env.URL_BDD , {useNewUrlParser : true})
       .then(( ) => console.log('connexion réuissie'))
       .catch(ex => console.log(ex))

const app = express();
// middleware
app.use(express.static("public"))

const serveur = app.listen(PORT , () => console.log(`connexion express ${PORT}`))
const ws = socket(serveur)

ws.on("connection" , socket => {



})
