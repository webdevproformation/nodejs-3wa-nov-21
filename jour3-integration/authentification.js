
exports.authentification = ( req, rep,  next ) => {

    // recupérer le req => header("x-auth")
    // JsonWebToken 
    // si cette information n'est pas présent => erreur 401 non autorisé 

    // verifier est ce que cet entête est valid => erreur 400 

    // si tout est conforme 
    // modifier la req ajouter une nouvelle propriété user
    // req.user = l'entête 
    // et le next()
    next();
    // rdv 14h00 bon appétit !! 
}


