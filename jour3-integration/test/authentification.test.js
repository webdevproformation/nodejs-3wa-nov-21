
// vérifier si un on a fournit un JWT valid 
// est ce que la variable req dispose bien d'une propriété req.user 

// req.user =  { _id : "id base de données MongoDB "}
// test unitaire pour vérifier que cette fonctionnalité marche bien 

const { authentification } = require("../authentification")
const { User } = require("../model-user");

describe("authentification middleware" , () => {

    let req ;

    beforeEach(() => {
        const token = (new User()).generateJWT();
        req = {
            header : jest.fn().mockReturnValue(token)
        }
        const rep = {
            status : jest.fn().mockReturnValue(400)
        }; 
        const next = jest.fn()
        authentification(req, rep , next );
    })
    it("si token valid est ce que l'on une prop user dans la variable req" , () => {
        // simuler 3 paramètres de la fonction authentification 
        // fonction de Mock de jest 
        expect(req.user).not.toBeNull()
    })

    it("si token valid est ce que req.user contient un object { _id : ... }" , () => {
        expect(req.user).toHaveProperty("_id")
    })
    // cas pratique réaliser les tests pour vérifier que l'objet req.user contient la valeur _id

})

