const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const hash = require('gulp-hash-filename');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const clean = require('gulp-clean');
const exec = require('child_process').exec;
const nodemon = require('gulp-nodemon');
const isProd = process.env.NODE_ENV === 'production';

gulp.task('clean', function () {
    console.log("public folder deleted");
    return gulp.src('./public', {read: false, allowEmpty: true})
        .pipe(clean());
});

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
});

gulp.task('prod-server', () => {
    exec('node app.js', err => err);
});

gulp.task('styles-vendor', function () {
    return gulp.src("client/global/styles-vendor/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(
            gulpif(
                isProd, cssnano(
                    [
                        'default',
                        {
                            cssDeclarationSorter: false,
                            discardOverridden: false,
                            discardComments: false,
                            mergeIdents: true
                        }
                    ]
                )
            )
        )
        .pipe(gulp.dest("./public/css/styles/vendor/"))
});

gulp.task('styles-main', function () {
    return gulp.src("client/global/styles-main/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(
            gulpif(
                isProd, cssnano(
                    [
                        'default',
                        {
                            autoprefixer: {browsers: 'ie8', add: true, cascade: false, grid: true},
                            cssDeclarationSorter: false,
                            discardOverridden: false,
                            discardComments: false,
                            mergeIdents: true
                        }
                    ]
                )
            )
        )
        .pipe(gulp.dest("./public/css/styles/main/"))
});

gulp.task('styles-pages', function () {
    return gulp.src("client/pages/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(
            gulpif(
                isProd, cssnano(
                    [
                        'default',
                        {
                            autoprefixer: {browsers: 'ie8', add: true, cascade: false, grid: true},
                            cssDeclarationSorter: false,
                            discardOverridden: false,
                            discardComments: false,
                            mergeIdents: true
                        }
                    ]
                )
            )
        )
        .pipe(gulp.dest("./public/css/pages/"))
});

gulp.task('styles-components', function () {
    return gulp.src("client/components/**/*.+(scss|sass|css)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(
            gulpif(
                isProd, cssnano(
                    [
                        'default',
                        {
                            autoprefixer: {browsers: 'ie8', add: true, cascade: false, grid: true},
                            cssDeclarationSorter: false,
                            discardOverridden: false,
                            discardComments: false,
                            mergeIdents: true
                        }
                    ]
                )
            )
        )
        .pipe(gulp.dest("./public/css/components/"))
});

gulp.task('js-vendor', function () {
    return gulp.src("client/global/js-vendor/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('vendor.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(gulp.dest("./public/js/js-vendor/"))
});

gulp.task('js-main', function () {
    return gulp.src("client/global/js-main/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(gulp.dest("./public/js/js-main/"))
});

gulp.task('js-pages', function () {
    return gulp.src("client/pages/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(gulp.dest("./public/js/pages/"))
});

gulp.task('js-components', function () {
    return gulp.src("client/components/**/*.+(js)")
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(minify({noSource: true}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(sourcemaps.write())
        .pipe(hash())
        .pipe(gulp.dest("./public/js/components/"))
});

gulp.task('ejs-pages', function () {
    return gulp.src("client/pages/**/*.+(ejs)")
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest("./public/views/pages"))
});

gulp.task('ejs-components', function () {
    return gulp.src("client/components/**/*.+(ejs)")
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest("./public/views/components"))
});

gulp.task('media-files', function () {
    return gulp.src('client/media/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public/media'))
});

gulp.task('watch', function () {
    gulp.watch("client/global/styles-vendor/*.+(scss|sass|css)", gulp.parallel('styles-vendor'));
    gulp.watch("client/global/styles-main/**/*.+(scss|sass|css)", gulp.parallel('styles-main'));
    gulp.watch("client/**/*.+(scss|sass|css)", gulp.parallel('styles-pages'));
    gulp.watch("client/components/**/*.+(scss|sass|css)", gulp.parallel('styles-components'));

    gulp.watch("client/global/js-vendor/**/*.+(js)", gulp.parallel('js-vendor'));
    gulp.watch("client/global/js-main/**/*.+(js)", gulp.parallel('js-main'));
    gulp.watch("client/pages/**/*.+(js)", gulp.parallel('js-pages'));
    gulp.watch("client/components/**/*.+(js)", gulp.parallel('js-components'));

    gulp.watch("client/pages/**/*.+(ejs)", gulp.parallel('ejs-pages'));
    gulp.watch("client/components/**/*.+(ejs)", gulp.parallel('ejs-components'));

    gulp.watch("client/media/**/*", gulp.parallel('media-files'));
});

gulp.task('serve',
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

        'media-files'
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

        'media-files'
    ),
);

gulp.task('default', gulp.series('clean', 'serve'));
