// fonction de simulation de Jest => Mock Function 

// une fonction qui dépend d'une autre fonction 

const lib = require("./lib4");

exports.genererPanier = (id_client , montant) => {
    return {
        id : id_client ,
        nom : "Alain" ,
        montant : lib.reduction(montant)
    }
}


const db = require("./db")
exports.article = (obj , id_client) => {
  const client = db.getClient(id_client) // récupére un client 

  if(client.age > 20){
    obj.prix *= 0.9 ; // réduction de 10% sur le produit 
  }
}

