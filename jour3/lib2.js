exports.getUser = (id) => {
    const bdd = [ 
        {id : 1 , nom : "Alain"},
        {id : 2 , nom : "Béatrice"},
    ]
    return bdd.find( user => user.id === id ) // 1 => { id : 1 , nom : "Alain"}
    //                                        // -1 => undefined // [] ?? 
}

exports.rechercheArticle = (titre) => {
    titre = titre.toLowerCase();
    const bdd = [
        { id : 1 ,titre : "Article1"},
        { id : 2 ,titre : "Article1"},
        { id : 3 ,titre : "Article3"}
    ];
    return bdd.filter( el => el.titre.toLowerCase().includes(titre) )
}

// tester une fonction qui contient un path avec une exception 
exports.creerProfilUtilisateur = (email , password) => {
    if(!email || !password){
        throw new Error("identifiants manquants");
    }
    return {
        email ,
        password ,
        role : "redacteur",
        dt_creation : Date.now()
    }
}