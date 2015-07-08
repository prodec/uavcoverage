var gulp = require("gulp");
var gulpBabel = require("gulp-babel");
var babel = require("babel/register");
var jsdoc = require("gulp-jsdoc");
var mocha = require("gulp-mocha");

gulp.task("default", function() {
  return gulp.src("src/**/*.js")
    .pipe(gulpBabel())
    .pipe(gulp.dest("dist"));
});

gulp.task("docs", function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(jsdoc("doc"));
});

gulp.task("test", function() {
  return gulp.src("test/**/*.js")
    .pipe(mocha({
      reporter: "nyan",
      compilers: {
        js: babel
      }
    }));
});
