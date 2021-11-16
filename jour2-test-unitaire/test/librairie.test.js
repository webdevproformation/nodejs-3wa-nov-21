const lib = require("../librairie");

test("valeurAbsolue - chiffre positif alors return positif" , () => {
    // exécuter la fonction dans le call back
    const resultat = lib.valeurAbsolue(1);

    //expect => fonction d'assertion
    // matcher  .toBe(1)
    expect(resultat).toBe(1);
})

test("valeurAbsolue - chiffre negatif alors return positif" , () => {
    // exécuter la fonction dans le call back
    const resultat = lib.valeurAbsolue(-1);
    //expect => fonction d'assertion
    // matcher  .toBe(1)
    expect(resultat).toBe(1);
})

test("valeurAbsolue - chiffre 0 alors return 0" , () => {
    // exécuter la fonction dans le call back
    const resultat = lib.valeurAbsolue(0);
    //expect => fonction d'assertion
    // matcher  .toBe(1)
    expect(resultat).toBe(0);
})

test("valeurAbsolue - chiffre string alors return 0" , () => {
    // exécuter la fonction dans le call back
    const resultat = lib.valeurAbsolue("a");
    //expect => fonction d'assertion
    // matcher  .toBe(1)
    expect(resultat).toBe(0);
})
// 

test("mes tests sur la fonction valeurAbsolue" , () => {
    const mesTest = [
            { input : 1 , output : 1 } , 
            { input : -1 , output : 1 } , 
            { input : 0 , output : 0 } , 
            { input : "a" , output : 0 }
    ];
    mesTest.forEach( test => {
        const resultat = lib.valeurAbsolue(test.input);
        expect(resultat).toBe(test.output)
    } )
    //expect => fonction d'assertion
    // matcher  .toBe(1)
    // expect(resultat).toBe(0);
})


const mesTest = [
    { input : 1 , output : 1 , nom : "test1"} , 
    { input : -1 , output : 1 , nom : "test2"} , 
    { input : 0 , output : 0 , nom : "test3"} , 
    { input : "a" , output : 0 , nom : "test4"}
];

mesTest.forEach( test2 => {
    test(test2.nom , () => {
        const resultat = lib.valeurAbsolue(test2.input);
        expect(resultat).toBe(test2.output)
    })
} )
