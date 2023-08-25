import * as gulp from 'gulp'
import compilets from './ext/Compile'

const sass = require('gulp-sass')(require('sass'));

const DEBUG = true;

function plugin(name: string) {
    let cached: any;
    return function() {
        if (cached) return cached;
        cached = require(name);
        return cached;
    }
}

const plugins = {
    concat: plugin('gulp-concat'),
    rename: plugin('gulp-rename'),
    replace: plugin('gulp-replace'),
    merge: plugin('merge2'),
    clean: plugin('gulp-clean'),
    insert: plugin('gulp-insert'),
    uglify: plugin('gulp-uglify'),
    tar: plugin('gulp-tar'),
    gzip: plugin('gulp-gzip'),
    typedoc: plugin('gulp-typedoc'),
};

const projectPath = './ChannelsDB';
const destDir = './dist/ChannelsDB';

function buildChannelsDB(){
        const src = gulp.src([
        projectPath + '/*', 
        '!'+projectPath + '/tsconfig.json', 
        '!'+projectPath + '/index_old.html', 
        '!'+projectPath + '/provided', 
        '!'+projectPath + '/src']).pipe(gulp.dest(destDir))
        
        const minify = !DEBUG;

        const providedCss = [projectPath + '/provided/css/*'];
        const css = gulp.src([projectPath + '/css/*','./'])
        .pipe(sass({ outputStyle: minify ? 'compressed' : void 0 }).on('error', sass.logError))

        .pipe(plugins.concat()('styles.css'))
        .pipe(gulp.dest(destDir + '/css'));

        const cssMin = gulp.src(providedCss)
        .pipe(plugins.concat()('litemol.css'))
        .pipe(gulp.dest(destDir + '/css'));

        const providedJs = [projectPath + '/provided/js/*'];
        
        const jsMin = gulp.src(providedJs)
        .pipe(plugins.concat()("litemol.js"))
        .pipe(gulp.dest(destDir + '/js'));

        const js = gulp.src([projectPath + '/js/*'])
        .pipe(plugins.uglify()())
        .pipe(plugins.concat()("scripts.js"))
        .pipe(gulp.dest(destDir + '/js'));

        const fonts = gulp.src([projectPath +'/fonts/*'])
        .pipe(gulp.dest(destDir + '/fonts'));

        const images = gulp.src([projectPath + '/images/*'])
        .pipe(gulp.dest(destDir + '/images'));

        return plugins.merge()([src, cssMin, css, jsMin, js, fonts, images]);
}

gulp.task('ChannelsDB-Core', gulp.series(async function() { 
    return await compilets({ project: `${projectPath}/tsconfig.json`, out: `${destDir}/ChannelsDB-Core.js` });
}, function () {
    return Promise.resolve("Done Core");
}));
gulp.task('ChannelsDB-Resources', gulp.series('ChannelsDB-Core', buildChannelsDB, function () {
    return Promise.resolve("Done resources");
}));

gulp.task('default', gulp.series(
    'ChannelsDB-Resources'
, function () {
    console.log('Done');
    return Promise.resolve("Done");
}
));
