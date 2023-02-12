const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const exec = require('child_process').exec;
const nodemon = require('gulp-nodemon');

const isProd = process.env.NODE_ENV === 'production'

gulp.task('dev-server', function () {
    const stream = nodemon({script: 'app.js'})

    stream
        .on('restart', function () {
            console.log('Server restarted')
        })
        .on('crash', function () {
            console.error('Server has crashed\n')
            stream.emit('restart', 10)
        })
})

gulp.task('prod-server', () => {
    exec('node app.js', err => err);
});

gulp.task('styles-vendor', function () {
    return gulp.src("src/global/styles-vendor/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/styles/vendor/"))
});

gulp.task('styles-main', function () {
    return gulp.src("src/global/styles-main/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/styles/main/"))
});

gulp.task('styles-pages', function () {
    return gulp.src("src/pages/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/pages/"))
});

gulp.task('styles-components', function () {
    return gulp.src("src/components/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/components/"))
});

gulp.task('js-vendor', function () {
    return gulp.src("src/global/js-vendor/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('vendor.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/js-vendor/"))
});

gulp.task('js-main', function () {
    return gulp.src("src/global/js-main/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/js-main/"))
});

gulp.task('js-pages', function () {
    return gulp.src("src/pages/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/pages/"))
});

gulp.task('js-components', function () {
    return gulp.src("src/components/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/components/"))
});

gulp.task('ejs-pages', function () {
    return gulp.src("src/pages/**/*.+(ejs)")
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest("./public/views/pages"))
});

gulp.task('ejs-components', function () {
    return gulp.src("src/components/**/*.+(ejs)")
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest("./public/views/components"))
});

gulp.task('watch', function () {
    gulp.watch("src/global/styles-vendor/*.+(scss|sass|css)", gulp.parallel('styles-vendor'));
    gulp.watch("src/global/styles-main/**/*.+(scss|sass|css)", gulp.parallel('styles-main'));
    gulp.watch("src/**/*.+(scss|sass|css)", gulp.parallel('styles-pages'));
    gulp.watch("src/components/**/*.+(scss|sass|css)", gulp.parallel('styles-components'));

    gulp.watch("src/global/js-vendor/**/*.+(js)", gulp.parallel('js-vendor'));
    gulp.watch("src/global/js-main/**/*.+(js)", gulp.parallel('js-main'));
    gulp.watch("src/pages/**/*.+(js)", gulp.parallel('js-pages'));
    gulp.watch("src/components/**/*.+(js)", gulp.parallel('js-components'));

    gulp.watch("src/pages/**/*.+(ejs)", gulp.parallel('ejs-pages'));
    gulp.watch("src/components/**/*.+(ejs)", gulp.parallel('ejs-components'));
});

gulp.task('default',
    isProd ? gulp.parallel(
        'prod-server',

        'styles-vendor',
        'styles-main',
        'styles-pages',
        'styles-components',

        'js-vendor',
        'js-main',
        'js-pages',
        'js-components',

        'ejs-pages',
        'ejs-components',
    ) : gulp.parallel(
        'dev-server',
        'watch',

        'styles-vendor',
        'styles-main',
        'styles-pages',
        'styles-components',

        'js-vendor',
        'js-main',
        'js-pages',
        'js-components',

        'ejs-pages',
        'ejs-components',
    ),
);