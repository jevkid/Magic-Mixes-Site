var gulp = require('gulp'),
    ractive = require('gulp-ractive'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    less = require('gulp-less');

gulp.task('serve', function() {
    connect.server({
    root: 'public',
    livereload: true,
    port: 8080
  });
});


var jsFiles = 'source/templates/controllers/*',
    jsDest = 'public/assets/scripts';

gulp.task('scripts', function(){
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('build-ractive', function() {
    return gulp.src('source/templates/controllers/*')
        .pipe(ractive({
          preserveWhitespace: true
        }))
        .pipe(gulp.dest('public/assets/scripts'));
});

gulp.task('build-boot', function() {
    return gulp.src(['source/styles/bootstrap/*'])
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('public/assets/stylesheets'));
});
gulp.task('build-less', function(){
    return gulp.src('source/styles/less/*')
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('clean', function() {
  return del.sync(['public', '!public/assets']);
});


gulp.task('build-templates', function() {
  return gulp.src(['source/templates/views/**', '!source/templates/*/'])
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['build-less', 'scripts', 'build-ractive', 'build-templates', 'clean', 'build-boot', 'serve']);

gulp.task('watch', function() {
    gulp.watch('source/less/**', ['build-less']);
    gulp.watch('public/assets/stylesheets/bootstrap.css');
    gulp.watch('public/assets/stylesheets/main.css');
    gulp.watch('public/assets/scripts/**');
    gulp.watch('source/templates/views/**', ['build-templates']);
});

gulp.task('dev', ['default', 'watch']);
