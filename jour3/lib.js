
// tester des fonctions qui retourne des chiffres
exports.ttc = (montant) => {
    if( montant >= 0 )  return montant * 1.2 ;
    if (montant < 0 ) return 0
}

// fonction qui retourne une string => mettre en place un test pour vérifier que la 
// la chaine de caractère est conforme 

exports.genererBtn = ( text , id ) => {
    if(id){
        return `<button id="${id}" class="${id}">${text}</button>`;
    }
    return `<button class="${text}">${text}</button>`;
}

