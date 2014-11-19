/*global require*/
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    prefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');


/*connect*/
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});


/*reload*/
gulp.task('reload', function () {
    connect.reload();
});


/*less*/
gulp.task('less', function () {
    gulp.src(['src/app.less',
              'src/**/*.less'])
        .pipe(less())
        .on('error', function () {
            notify('Ошибка в задаче less!');
        })
        .pipe(concatCss('all.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(notify('less Ok!'));
});


/*css*/
gulp.task('css', function () {
    gulp.src(['src/css/**/*.css', 'bower_components/sweetalert/lib/sweet-alert.css'])
        //.pipe(sourcemaps.init())
        .pipe(concatCss('all.css'))
        .pipe(prefixer('last 3 versions', 'ie >= 8'))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('css Ok!'));
});


/*js*/
gulp.task('js', function () {
    gulp.src(['bower_components/jquery/dist/jquery.js',
              'bower_components/bootstrap/dist/js/bootstrap.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js',
              'bower_components/angular-ui-bootstrap/dist/ui-bootstrap-0.11.2.js',
              //'bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.11.2.js',
              'bower_components/angular-cookies/angular-cookies.js',
              'bower_components/angular-loading-bar/build/loading-bar.js',
              'bower_components/sweetalert/lib/sweet-alert.js',
              'bower_components/angular-sweetalert/sweetalert.js',
              'src/app.js',
              'src/**/*.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .on('error', function () {
            notify('Ошибка в задаче js!');
        })
        .pipe(rename({
            suffix: '.min'
        }))
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('js Ok!'));
});


/*watch*/
gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['less', 'css', 'reload']);
    gulp.watch('src/**/*.js', ['js', 'reload']);
});


/*copy*/
gulp.task('copy', function () {
    gulp.src('bower_components/angular-ui-bootstrap/template/**/*.html')
        .pipe(gulp.dest('dist/template'));
});


/*default*/
gulp.task('default', ['connect', 'watch', 'copy']);