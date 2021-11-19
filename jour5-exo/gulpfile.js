const { task , src , dest , watch } = require("gulp")

const sass = require("gulp-sass")(require("sass"));
const compress = require("gulp-uglifycss");

const miseEnProd = async ()  => { 
    await src("./*.scss")
        .pipe(sass())
        .pipe(compress())
        .pipe(dest("build"))
}

task( "prod" , miseEnProd );

task("watch" , () => {
    watch("./*.scss" , miseEnProd);
})