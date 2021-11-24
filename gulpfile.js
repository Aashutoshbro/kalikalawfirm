const { src, series, parallel, dest, watch } = require("gulp");
const gulp = require("gulp");
const imagemin = require("gulp-image");
const sass = require("gulp-sass")(require("sass"));
var sourcemaps = require("gulp-sourcemaps");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");

function copyHtml() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

function copyFonts() {
  return src("src/fonts/*.*").pipe(gulp.dest("dist/fonts"));
}


function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "dist",
    },
  });
  cb();
}
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

//compile, prefix, and min scss
function compilescss() {
  return src("src/css/*.scss", { sourcemaps: true }) // change to your source directory
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(sourcemaps.write("."))
    // .pipe(minify())
    .pipe(dest("dist/css"));
}

// optimize images
function optimizeimg() {
  return src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
}

// minify js
function jsmin(){
  return src("src/js/*.js") // change to your source directory
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(dest("dist/js")); // change to your final/public directory
}


//watchtask
function watchTask() {
  watch("src/*.html", series(copyHtml, browsersyncReload)); // change to your source directory
  watch("src/fonts/*.*", series(copyFonts, browsersyncReload)); // change to your source directory
  watch("src/css/**/*.scss", series(compilescss, browsersyncReload)); // change to your source directory
  watch("src/js/*.js", series(jsmin, browsersyncReload)); // change to your source directory
  watch("src/img/*", series(optimizeimg, browsersyncReload)); // change to your source directory
}

exports.default = series(
  copyHtml,
  copyFonts,
  compilescss,
  optimizeimg,
  jsmin,
  browsersyncServe,
  watchTask
);