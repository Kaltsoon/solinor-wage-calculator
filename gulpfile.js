require('dotenv').config();

require('app-module-path').addPath(__dirname);

const gulp = require('gulp');

const makeNodemonTask = require('./gulp-tasks/nodemon-task');
const makeMochaTask = require('./gulp-tasks/mocha-task');

gulp.task('nodemon', makeNodemonTask({
  watch: ['./app-modules', './server']
}));

gulp.task('tests.server', makeMochaTask({
  entries: ['./app-modules/**/__tests__/*.js', './server/**/*__tests__/*.js']
}));

gulp.task('tests', ['tests.server']);

gulp.task('default', ['nodemon']);
