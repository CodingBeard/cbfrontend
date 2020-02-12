module.exports = function (gulp, plugins, conf, errorHandler) {

  return async function copyJS() {
    gulp.src('./src/_assets/ts/index.b.min.js', {"allowEmpty": true})
        .pipe(gulp.dest('./resources/js/', {"overwrite": true}))
        .on('error', errorHandler);
  };

};
