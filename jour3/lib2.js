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
    return bdd.filter( el => el.titre.toLowerCase() === titre )
}