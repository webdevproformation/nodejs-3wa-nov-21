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