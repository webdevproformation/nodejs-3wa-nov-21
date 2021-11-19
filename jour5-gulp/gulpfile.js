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




