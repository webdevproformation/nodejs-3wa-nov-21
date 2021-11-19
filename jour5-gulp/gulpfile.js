// npm i gulp gulp-autoprefixer -save-dev

const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const uglifycss = require("gulp-uglifycss");

gulp.task("addPrefix" , async () => {
    await gulp.src("./style.css")
            .pipe( autoprefixer({
                browsers: ['last 99 versions']
            }) )
            .pipe( gulp.dest("prod") )
})
// gulp addPrefix 
gulp.task("compress" , async () => {
    await gulp.src("./style.css")
            .pipe(uglifycss())
            .pipe( gulp.dest("prod") )
})
// gulp compress

// const runSequence = require("run-sequence");

// fusionner dans une seule tâche 
//  npm i run-sequence --save-dev
gulp.task("prodCss" , async() => {
    await gulp.src("./style.css")
            .pipe( autoprefixer({
                browsers: ['last 99 versions']
            }) )
            .pipe(uglifycss())
            .pipe( gulp.dest("prod") )
})
// fusionner manuellement les deux taches 

/* gulp.task("prodCss2" , async(cb) => {
    const addPrefix = async function(){
        await gulp.src("./style.css")
            .pipe( autoprefixer({
                browsers: ['last 99 versions']
            }) )
        cb()
    }
    const compress = async (cb) => {
        await gulp.src("./style.css")
            .pipe(uglifycss())
        cb()
    }

    await gulp.series(addPrefix , compress)
                .pipe( gulp.dest("prod") ) ;
}) */

// npm i gulp-sass --save-dev
// npm i gulp-rename --save-dev
// npm i node-sass --save-dev
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");

gulp.task("scss2css" , async () => {
    await gulp.src("style.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 99 versions']
        }))
        .pipe(uglifycss())
        .pipe(rename("./final.css"))
        .pipe(gulp.dest("./prod"));
})

// npm i gulp-jsbeautifier --save-dev
const beautify = require('gulp-jsbeautifier');
gulp.task("joli" , async () => {
    await gulp.src("final.css")
        .pipe(beautify())
        .pipe(rename("./final-joli.css"))
        .pipe(gulp.dest("./prod"));
})

// créer un nouveau dossier jour5-exo

// dans ce fichier vous allez créer un fichier .scss
// créer un fichier de config gulp qui permet de réaliser la tâche suivante :
// transformer le fichier .scss => css
// transformer le fichier compressé en une ligne 
// le mettre dans un dossier build 




