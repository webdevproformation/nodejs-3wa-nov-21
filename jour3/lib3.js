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


