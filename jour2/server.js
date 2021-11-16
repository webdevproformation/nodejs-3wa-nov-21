const express = require("express");
const socket = require("socket.io");

const PORT = process.env.PORT || 3444;
const app = express();

// middleware 
app.use(express.static("public")) // permettre à express de fournir les fichiers 
// static => .html .css .js dans le dossier public 
const serveur = app.listen(PORT , () => console.log("serveur démarré sur port " + PORT));

// brancher socket.io sur notre serveur express 
// ws => websocket
// permet de créer une connexion bidirectionnelle 
// multicast / broadcast 
const ws = socket(serveur)

// écouter lorsque le client établi une connexion webscoket 
ws.on("connection" , ( socket  ) => {

    // récupérer la demande de connexion par le client 
    // toutes les communications entre client / serveur via websocket 
    // écrire dans le callback
    console.log(socket.id) // dès que le client fait une demande => chaque communication
    // dispose d'un id 

    socket.on("message" , (data) => {
        // envoyer le message à l'ensemble tous les clients 
        // multicast tout le monde même celui qui l'a émis
        ws.sockets.emit("reponse" , data );
    })

    socket.on("redaction", (data) => {
        // broadcast : tout le monde sauf celui 
        // qui l'a émis
        socket.broadcast.emit("feedback" , data)
    })

})

