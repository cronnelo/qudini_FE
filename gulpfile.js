var gulp = require('gulp')
var sass = require('gulp-sass')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var minifyCSS = require('gulp-csso');
var prefix = require('gulp-autoprefixer')

gulp.task('js', function () {
  gulp.src([
    'public/bower_components/angularjs/angular.js',
    'public/QueueApp.js',
    'public/add-customer/*.js',
    'public/customer/*.js'
  ])
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('sass', function() {
  gulp.src('public/css/main.scss')
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minifyCSS())
    .on('error', gutil.log)
    .pipe(gulp.dest('public/css'))
});

gulp.task('build', ['sass', 'js'])
