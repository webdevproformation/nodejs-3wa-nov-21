
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


exports.salutation = (langue) => {
    if(langue == "fr") return "<p>Bonjour</p>";
    if(langue == "en") return "<p>Hello</p>"; 
    return "langue inconnue"
}


// tester des array => fonction qui vont retourner des tableaux

exports.saison = () => {
    return ["printemps", "été", "automne", "hiver"];
}

exports.fizzBuzz = ( nombre ) => {
    if(nombre % 3 === 0 && nombre % 5 === 0) return "FizzBuzz" ;
    if(nombre % 3 === 0) return "Fizz";
    if(nombre % 5 === 0) return "Buzz";
    return nombre ;
}

