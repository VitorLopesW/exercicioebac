const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

function compileSass(){
    console.log("Executando sass, via Gulp")
    return gulp.src('./source/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./built'))
}

exports.default = compileSass

exports.watch = function() {
    gulp.watch('./source/*.sass',{ ignoreInitial: false }, gulp.series(compileSass))
}