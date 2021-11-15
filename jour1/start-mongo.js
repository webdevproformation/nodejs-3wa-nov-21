const { connect } = require("mongoose");

module.exports = function(){
    const url = process.env.BD;
    connect( url , { useNewUrlParser : true })
        .then( () => console.log("connexion effectuée à mongodb") )
        .catch( ex => console.log(new Error(ex)))
}
