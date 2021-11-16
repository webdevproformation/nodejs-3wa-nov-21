const socket = io.connect("http://localhost:3333/");

// formulaire
const form = document.querySelector("form");
const nom = document.querySelector(".input-nom");
const message = document.querySelector(".input-message");

// message 
const outputMessage = document.querySelector(".output-message")
const outputFeedback = document.querySelector(".output-feedback")
const tchatBox = document.querySelector("section")

form.addEventListener("submit", e => {
    e.preventDefault();

    const messageTchat = {
        nom : nom.value,
        message : message.value,
    } 
    socket.emit("message" , messageTchat);
})

socket.on("reponse" , (data) => {
    outputMessage.innerHTML += `
        <p>
            <button data-id="${data._id}" ${ data.nom != nom.value ? 'disabled' : '' } >suppr</button>
            <span>
                ${data.nom} - ${data.message}
            </span>
        </p>
    `
})

// suppression
tchatBox.addEventListener("click" , e => {
    if(e.target.nodeName === "BUTTON"){
        const id = e.target.dataset.id ;
        socket.emit("suppr-message" , id);
    }
})

socket.on("suppr-message-id" , id => {
    tchatBox.querySelector(`button[data-id='${id}']`).parentNode.remove()
})


