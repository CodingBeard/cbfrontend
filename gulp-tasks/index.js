//////////////////////
// GLOBAL VARIABLES
//////////////////////

let gulp = require('gulp');
let vinyl = require('vinyl');
let yaml = require('js-yaml');
let fs = require('fs');
let conf = yaml.load(fs.readFileSync('./gulpconfig.yaml', 'utf8'));
let browserSync = require('browser-sync').create();
let plugins = require('gulp-load-plugins')();
let exec = require('child_process').exec;

//////////////////////
// INDIVIDUAL TASKS
//////////////////////

plugins.sass.compiler = require('dart-sass');

let args = require('./tasks/gulp-args')(gulp, conf, errorHandler);
let js = require('./tasks/gulp-js')(gulp, plugins, conf, errorHandler);
let copyJs = require('./tasks/gulp-copy-js')(gulp, plugins, conf, errorHandler);
let scss = require('./tasks/gulp-scss')(gulp, plugins, conf, errorHandler);
let font = require('./tasks/gulp-font')(gulp, plugins, conf, errorHandler);
let img = require('./tasks/gulp-img')(gulp, plugins, conf, errorHandler);
let browserReload = require('./tasks/gulp-browser-reload')(gulp, browserSync, conf, errorHandler);
let browserSyncProxy = require('./tasks/gulp-browser-sync-proxy')(gulp, browserSync, conf, errorHandler);
let watcher = require('./tasks/gulp-watcher')(gulp, browserSync, conf, errorHandler, {js, browserReload, scss, font});

//////////////////////////////
// Error Handler Functions
//////////////////////////////

function readTextFile() {
  let data = null;

  fs.readFile(
    './gulp-errors.json',
    "utf-8",
    function (err, _data) { data = _data; }
  );

  return data;
}

function logError(origin, log) {
  let src = require('stream').Readable({objectMode: true});

  src._read = function () {
    console.log(
      '//////////////////// ERROR ///////////////////' +
      '\n' +
      '             Check gulp-errors.json           ' +
      '\n' +
      '//////////////////////////////////////////////'
    );
    this.push(
      new vinyl(
        {
          path:     './gulp-errors.json',
          contents: Buffer.from(log)
        }
      )
    );
    this.push(null);
  };

  return src;
}

function errorHandler(error) {
  logError(readTextFile(), JSON.stringify(error, null, "\t")).pipe(gulp.dest('./'));
  return true;
}

module.exports = {
  args, js, font, scss, copyJs, img, watcher, browserSyncProxy
};
