const lib = require("../lib2");


describe("getUser", ()=> {
    it("retourne un user si id valid" , ()=> {
        const resultat = lib.getUser(1);
        // .toBe() nombre / string 
        // .toEqual() nombre / string 
        // .toEqual() => object se ressemble 
        // .toBe() => object vont avoir la même ref mémoire 
        expect(resultat).toEqual({id : 1 , nom : "Alain"})

        // toMatchObject() une partie de l'objet {id : 1}
        // toHaveProperty("id")
        // toHaveProperty("id" , 1)
        expect(resultat).toMatchObject({id : 1})
        expect(resultat).toHaveProperty("id")
        expect(resultat).toHaveProperty("id", 1)
    })

    it("retourne undefined si id invalid" , () => {
        const resultat = lib.getUser(-1);
        expect(resultat).toBe(undefined);
        expect(resultat).toBeFalsy(); // 0 "" -0 NaN undefined null false 
        // []  {} => en javascript ça ne renvoie pas faux 
    })
});

describe("rechercheArticle" , () => {
    it("retourne une collection si le titre existe" , () => {
        const resultat = lib.rechercheArticle("Article");
        expect(resultat.length).toBeGreaterThanOrEqual(1) // [{}, {}]
        expect(resultat.some(a => a.titre.includes("Article"))).toBeTruthy()
    })
    it("retourne une tableau vide si le titre n'existe pas" , () => {
        const resultat = lib.rechercheArticle("n'existe pas");
        expect(resultat.length).toBe(0)
    })
})

describe("creerProfilUtilisateur", () => {
    // cas où la fonction va lever une exception
    it("lève une exception si les inputs sont absents ou falsy" , () => {
        expect(() => { lib.creerProfilUtilisateur() }).toThrow();

        const falsy = [0 , undefined , null , -0 , false , "" , NaN] ;
        falsy.forEach( faux  => {
            expect(() => { lib.creerProfilUtilisateur(faux , faux) }).toThrow();
        })
    })
    // le cas où on récupère un objet 
    it("retourne un user si les inputs sont valides" , () => {
        const resultat = lib.creerProfilUtilisateur("a", "a")
        expect(resultat).toHaveProperty("dt_creation")
        expect(resultat).toHaveProperty("email" , "a")
        expect(resultat).toMatchObject({"password" : "a"})
    })
})

describe("palindrome" , () => {
    // vérifier est ce que exception si la valeur n'est pas une chaine caractère 
    it("lever une exception si l'input est falsy plus" , () => {
        const falsyPlus = [0 , undefined , null , -0 , false , "" , NaN , [] , {}];
        falsyPlus.forEach( faux => {
            expect(() => { lib.palindrome(faux) }).toThrow()
        })
    })
    // vérifier si je donne un input qui n'est pas un palindrome false
    it("retourne false si input n'est pas un palindrome valide", () => {
        const palindromeInvalid = ["manger", 'bonjour'];
        palindromeInvalid.forEach( str => {
            const resultat = lib.palindrome(str);
            expect(resultat).toBe(false);
        })
    })
    // vérifier si je donne un input qui est un palindrome true
    it("retourne true si input est un palindrome valide même avec des espaces", () => {
        const palindromeValid = ["laval", 'lol' , "Engage le jeu que je le gagne"];
        palindromeValid.forEach( str => {
            const resultat = lib.palindrome(str);
            console.log(str , resultat);
            expect(resultat).toBe(true);
        })
    })

})