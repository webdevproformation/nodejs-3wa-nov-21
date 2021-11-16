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

ws.on("connection" , async( socket ) => {
        
       const allMessage = await Message.find()
       ws.sockets.emit("all-message", allMessage);

       socket.on("message" , async(data) => { 
        try{
            let nouveauMessage = new Message(data)
            nouveauMessage = await nouveauMessage.save()
            ws.sockets.emit("reponse", nouveauMessage)
        }
        catch(ex){
            console.log(ex)
        }
       })

       socket.on("suppr-message" , async (id) => {
           await  Message.deleteOne({_id : id}); 
           ws.sockets.emit("suppr-message-id", id)
       })
})
