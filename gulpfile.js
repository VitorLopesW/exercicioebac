const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')

function comprimeImagens(){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./built/images'))
}

function compileSass(){
    console.log("Executando sass, via Gulp")
    return gulp.src('./source/styles*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./built/styles'))
}



function minifyJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./built/scripts'));
}

exports.default = function() {
    gulp.watch('./source/styles*.sass',{ ignoreInitial: false }, gulp.series(compileSass))

    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(minifyJS))

    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens))
}