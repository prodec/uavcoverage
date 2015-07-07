var gulp = require("gulp");
var babel = require("gulp-babel");
var jsdoc = require("gulp-jsdoc");

gulp.task("default", function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("docs", function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(jsdoc("doc"));
});
