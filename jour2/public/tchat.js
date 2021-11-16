// alert("bonjour tout le monde ");

const socket = io.connect("http://localhost:3444") // établi la connexion avec le serveur en utilisant connexion websocket 

// formulaire 
const form = document.querySelector("form");
const nom = document.querySelector(".input-nom");
const message = document.querySelector(".input-message");

// afficher les messages le tchat 
const outputMessage = document.querySelector(".output-message");
const outputFeedback = document.querySelector(".output-feedback");

// remplir le formulaire et de le soumettre 

form.addEventListener("submit" , e => {
    e.preventDefault();
    if( nom.value != "" && message.value != ""){
        const messageInfo = {
            nom : nom.value ,
            message : message.value
        }
        socket.emit( "message" , messageInfo ) 
        // le premier paramètre "string" => le texte que tu veux
        message.value = "";
    }
})

// écouter lorsque le serveur envoie un message qui a pour nom "reponse"

socket.on("reponse", ( data ) => {
    outputMessage.innerHTML += `<p>${data.nom} - ${data.message}</p>`;
    outputFeedback.innerHTML = "";
})

message.addEventListener("keypress" , () => {
    const message = {
        nom : nom.value ,
        message : "est en train d'écrire"
    }
    socket.emit("redaction" , message)
})

socket.on("feedback" , (data) => {
    outputFeedback.innerHTML = 
    `<p><i>${data.nom} - ${data.message}</i></p>`
})
