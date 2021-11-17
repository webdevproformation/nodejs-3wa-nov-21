exports.getUser = (id) => {
    const bdd = [ 
        {id : 1 , nom : "Alain"},
        {id : 2 , nom : "Béatrice"},
    ]
    return bdd.find( user => user.id === id ) // 1 => { id : 1 , nom : "Alain"}
    //                                        // -1 => undefined // [] ?? 
}