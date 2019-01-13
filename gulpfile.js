const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const plumber      = require('gulp-plumber');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'public/',
            index: './index.html'
        },
        open: false,
        notify: false,
        logLevel: 'debug'
    });

    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.*', ['js']);
    gulp.watch('src/images/**/*.*', ['images']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    gulp.watch(['./src/html/**/*.html'], ['html'])
        .on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', () => {
    const dst = 'public/js/';

    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest(dst))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', () => {
    gulp.src(['src/html/*.html'], {
        base: 'src/html/'
    })
    .pipe(plumber())
    .pipe(gulp.dest('./public/'));
});

gulp.task('images', () => {
    gulp.src(['src/images/**/*.*'], {
        base: 'src/images/'
    })
    .pipe(plumber())
    .pipe(gulp.dest('public/images/'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.*')
  .pipe(gulp.dest('public/fonts'))
})



gulp.task('default', ['sass', 'js', 'html', 'images', 'fonts', 'browser-sync']);
