import * as fs from 'fs'
import * as gulp from 'gulp'
import compilets from './ext/Compile'

let DEBUG = true;

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
    sass: plugin('gulp-sass'),
    uglify: plugin('gulp-uglify'),
    tar: plugin('gulp-tar'),
    gzip: plugin('gulp-gzip'),
    typedoc: plugin('gulp-typedoc'),
};

let projectPath = './ChannelsDB';
let destDir = './dist/ChannelsDB';

function buildChannelsDB(){
        let src = gulp.src([
        projectPath + '/*', 
        '!'+projectPath + '/tsconfig.json', 
        '!'+projectPath + '/index_old.html', 
        '!'+projectPath + '/provided', 
        '!'+projectPath + '/src']).pipe(gulp.dest(destDir))
        
        let minify = !DEBUG;

        let providedCss = [projectPath + '/provided/css/*'];
        let css = gulp.src([projectPath + '/css/*','./'])
        .pipe(plugins.sass()({ outputStyle: minify ? 'compressed' : void 0 }).on('error', plugins.sass().logError))

        .pipe(plugins.concat()('styles.css'))
        .pipe(gulp.dest(destDir + '/css'));

        let cssMin = gulp.src(providedCss)
        .pipe(plugins.concat()('litemol.css'))
        .pipe(gulp.dest(destDir + '/css'));

        let providedJs = [projectPath + '/provided/js/*'];
        
        let jsMin = gulp.src(providedJs)
        .pipe(plugins.concat()("litemol.js"))
        .pipe(gulp.dest(destDir + '/js'));

        let js = gulp.src([projectPath + '/js/*'])
        .pipe(plugins.uglify()())
        .pipe(plugins.concat()("scripts.js"))
        .pipe(gulp.dest(destDir + '/js'));

        let fonts = gulp.src([projectPath +'/fonts/*'])
        .pipe(gulp.dest(destDir + '/fonts'));

        let images = gulp.src([projectPath + '/images/*'])
        .pipe(gulp.dest(destDir + '/images'));

        return plugins.merge()([src, cssMin, css, jsMin, js, fonts, images]);
}

gulp.task('ChannelsDB-Core', [], function() { 
    return compilets({ project: `${projectPath}/tsconfig.json`, out: `${destDir}/ChannelsDB-Core.js` });
});
gulp.task('ChannelsDB-Resources', ['ChannelsDB-Core'], buildChannelsDB);

gulp.task('default', [
    'ChannelsDB-Resources'
], function () {
    console.log('Done');
});
