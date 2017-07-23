var gulp = require('gulp'),
    ractive = require('gulp-ractive'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    replace = require('gulp-string-replace');

gulp.task('serve', function() {
    connect.server({
    root: 'public',
    livereload: true,
    port: 8080
  });
});


var jsFiles = 'source/templates/controllers/*',
    jsDest = 'public/assets/scripts';

var apiInfo = {
  apiKey: 'tz1wjg6wvmvezr1o3xv4rom6',
  shopName: 'VelvetFoxStudio'
};

gulp.task('scripts', function(){
    return gulp.src(jsFiles)
        .pipe(replace('<<KEY>>', apiInfo.apiKey))
        .pipe(replace('<<NAME>>', apiInfo.shopName))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('build-ractive', function() {
    return gulp.src('source/templates/controllers/*')
        .pipe(replace('<<KEY>>', apiInfo.apiKey))
        .pipe(replace('<<NAME>>', apiInfo.shopName))
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


gulp.task('copy-index', function(){
    return gulp.src(['source/templates/views/extends/layout.jade', 'source/templates/views/index.jade', '!source/templates/views/extends/*', 'source/templates/views/handlebars/*'])
        .pipe(jade())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('public/index'));
});

gulp.task('copy-products', function(){
    return gulp.src(['source/templates/views/extends/layout.jade', 'source/templates/views/products.jade', '!source/templates/views/extends/*', 'source/templates/views/handlebars/*'])
        .pipe(jade())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('public/products'));
});

gulp.task('copy-cart', function(){
    return gulp.src(['source/templates/views/extends/layout.jade', 'source/templates/views/cart.jade', '!source/templates/views/extends/*', 'source/templates/views/handlebars/*'])
        .pipe(jade())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('public/cart'));
});

gulp.task('copy-search', function(){
    return gulp.src(['source/templates/views/extends/layout.jade', 'source/templates/views/search.jade', '!source/templates/views/extends/*', 'source/templates/views/handlebars/*'])
        .pipe(jade())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('public/search'));
});

gulp.task('build-templates', ['copy-index', 'copy-products', 'copy-search']);
gulp.task('default', ['build-less', 'scripts', 'build-ractive', 'build-templates', 'build-boot', 'serve']);

gulp.task('watch', function() {
    gulp.watch('source/styles/less/**', ['build-less']);
    gulp.watch('public/assets/stylesheets/bootstrap.css');
    gulp.watch('public/assets/stylesheets/main.css');
    gulp.watch('public/assets/scripts/**');
    gulp.watch('source/templates/controllers/**', ['build-ractive', 'scripts']);
    gulp.watch('source/templates/views/**', ['build-templates']);
});

gulp.task('dev', ['default', 'watch']);
