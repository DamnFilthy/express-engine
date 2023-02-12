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
    return gulp.src("views/global/styles-vendor/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/styles/vendor/"))
});

gulp.task('styles-global', function () {
    return gulp.src("views/global/styles-global/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('global.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/styles/global/"))
});

gulp.task('styles-pages', function () {
    return gulp.src("views/pages/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/pages/"))
});

gulp.task('styles-components', function () {
    return gulp.src("views/components/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/components/"))
});

gulp.task('js-vendor', function () {
    gulp.src("views/global/js-vendor/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('vendor.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/js-vendor/"))
});

gulp.task('js-global', function () {
    gulp.src("views/global/js-global/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('global.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/js-global/"))
});

gulp.task('js-pages', function () {
    gulp.src("views/pages/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/pages/"))
});

gulp.task('js-components', function () {
    gulp.src("views/components/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/js/components/"))
});

gulp.task('watch', function () {
    gulp.watch("views/global/styles-vendor/*.+(scss|sass|css)", gulp.parallel('styles-vendor'));
    gulp.watch("views/global/styles-global/**/*.+(scss|sass|css)", gulp.parallel('styles-global'));
    gulp.watch("views/**/*.+(scss|sass|css)", gulp.parallel('styles-pages'));
    gulp.watch("views/components/**/*.+(scss|sass|css)", gulp.parallel('styles-components'));

    gulp.watch("views/global/js-vendor/**/*.+(js)", gulp.parallel('js-vendor'));
    gulp.watch("views/global/js-global/**/*.+(js)", gulp.parallel('js-global'));
    gulp.watch("views/pages/**/*.+(js)", gulp.parallel('js-pages'));
    gulp.watch("views/components/**/*.+(js)", gulp.parallel('js-components'));
});

gulp.task('default',
    isProd ? gulp.parallel(
        'prod-server',

        'styles-vendor',
        'styles-global',
        'styles-pages',
        'styles-components',

        'js-vendor',
        'js-global',
        'js-pages',
        'js-components',
    ) : gulp.parallel(
        'dev-server',
        'watch',

        'styles-vendor',
        'styles-global',
        'styles-pages',
        'styles-components',

        'js-vendor',
        'js-global',
        'js-pages',
        'js-components',
    ),
);