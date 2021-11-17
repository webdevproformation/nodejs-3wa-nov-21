const { genererPanier } = require("../lib3")
let lib = require("../lib4");

describe("genererPanier" , () => {
    it("return une client avec mon montant reduit de 5%", () => { 
        // copie 
        // surcharge 
        lib.reduction = (montant) => { 
                console.log("exécution de la fonction de simulation")
                return 10 ;
            };
        const resultat = genererPanier(1 , 20);
        expect(resultat.montant).toBe(10)
        expect(resultat).toHaveProperty("id" , 1);
    })

    // fonction de mock de jest (de la librairie)
    // https://jestjs.io/docs/mock-functions

    it("return une client", () => { 
        // copie 
        // surcharge 
        // surcharge avec une fonction de simulation (mock)
        // jest.fn() => créer une fonction vide 
        // jest.fn().mockReturnValue(10) => retourne 10 
        lib.reduction = jest.fn().mockReturnValue(10) ;
        // https://jestjs.io/docs/mock-function-api

        const resultat = genererPanier(1 , 20);
        expect(resultat.montant).toBe(10)
        expect(resultat).toHaveProperty("id" , 1);
    })
})

// effectuer une test sur une unité de ton application
// SANS aucune dépendance 

