const gulp = require('gulp'),
    browserSync = require('browser-sync').create();
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ()=>
    gulp.src('./scss/style.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['cover 99.5%']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
);
gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});

gulp.task('default',()=>{
    browserSync.init({
        server: "./"
    });
    gulp.watch('./scss/**/*.scss',['sass']);
    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});