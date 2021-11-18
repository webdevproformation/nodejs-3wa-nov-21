const jwt = require("jsonwebtoken");

exports.authentification = ( req, rep,  next ) => {
    // recupérer le req => header("x-auth")
    // JsonWebToken 
    const token = req.header("x-auth");
    // si cette information n'est pas présent => erreur 401 non autorisé 
    if(!token){
        return rep.status(401).send("Accès refusé vous n'avez pas les droits")
    }
    try{
        const tokenDecode = jwt.verify(token , process.env.SECRET_JWT)
        // si tout est conforme 
        // modifier la req ajouter une nouvelle propriété user
        req.user = tokenDecode ;
        // et le next()
        next();
    }catch(ex){
        // verifier est ce que cet entête est valid => erreur 400 
        return rep.status(400).send("token founi invalid")
    }
}