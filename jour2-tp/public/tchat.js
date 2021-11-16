const socket = io.connect("http://localhost:3333/");

// formulaire
const form = document.querySelector("form");
const nom = document.querySelector(".input-nom");
const message = document.querySelector(".input-message");

// message 
const outputMessage = document.querySelector(".output-message")
const outputFeedback = document.querySelector(".output-feedback")
const tchatBox = document.querySelector("section")

function remplirTchatBox(data){
    return `
    <p>
        <button id="id${data._id}" ${ data.nom != nom.value ? 'disabled' : '' } >suppr</button>
        <span>
            ${data.nom} - ${data.message}
        </span>
    </p>`
}

// soumission du formulaire
form.addEventListener("submit", e => {
    e.preventDefault();

    const messageTchat = {
        nom : nom.value,
        message : message.value,
    } 
    socket.emit("message" , messageTchat);
})

// réponse du socket 
socket.on("reponse" , (data) => {
    outputMessage.innerHTML += remplirTchatBox(data);
})

// bouton de suppression
tchatBox.addEventListener("click" , e => {
    if(e.target.nodeName === "BUTTON"){
        const id = e.target.id.slice(2) ;
        socket.emit("suppr-message" , id);
    }
})

// réception du message pour supprimer 
socket.on("suppr-message-id" , id => {
    tchatBox.querySelector(`#id${id}`).parentNode.remove()
})

// remplir le tchat lors du lancement du navigateur
socket.on("all-message" , data => {
    data.forEach( message => {
        outputMessage.innerHTML += remplirTchatBox(message);
    } );
})



