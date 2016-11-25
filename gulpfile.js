require('dotenv').config({ silent: true });

require('app-module-path').addPath(__dirname);

const gulp = require('gulp');
const path = require('path');

const makeNodemonTask = require('./gulp-tasks/nodemon-task');
const makeMochaTask = require('./gulp-tasks/mocha-task');
const makeScriptTask = require('./gulp-tasks/script-task');
const makeSassTask = require('./gulp-tasks/sass-task');
const makeWebpackConfig = require('./gulp-tasks/webpack-config');
const makeAssetsTask = require('./gulp-tasks/assets-task');

const scriptsDist = path.join(__dirname, 'public', 'js');
const stylesDist = path.join(__dirname, 'public', 'css');
const assetsDist = path.join(__dirname, 'public', 'assets');

const isDevelopment = process.env.NODE_ENV === 'development';

gulp.task('nodemon', makeNodemonTask({
  watch: ['./app-modules', './server']
}));

gulp.task('scripts', makeScriptTask({
  webpackConfig: makeWebpackConfig({
    entry: path.join(__dirname, 'client', 'app', 'index.jsx'),
    output: scriptsDist,
    fileName: 'app',
    modules: [path.join(__dirname, 'client', 'app')],
    env: {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: process.env.API_URL
    },
    isDevelopment
  }),
  isDevelopment
}));

gulp.task('assets', makeAssetsTask({
  entries: './client/assets/**/*',
  output: assetsDist
}));

gulp.task('styles', makeSassTask({
  entry: path.join(__dirname, 'client', 'app', 'styles', 'index.scss'),
  fileName: 'app',
  output: stylesDist,
  isDevelopment
}));

gulp.task('styles:watch', ['styles'], () => {
  gulp.watch(['./client/app/**/*.scss'], ['styles']);
});

gulp.task('tests.server', makeMochaTask({
  entries: ['./app-modules/**/__tests__/*.js', './server/**/*__tests__/*.js']
}));

gulp.task('tests', ['tests.server']);

gulp.task('build', ['styles', 'scripts', 'assets']);

gulp.task('default', ['nodemon', 'scripts', 'styles:watch']);
