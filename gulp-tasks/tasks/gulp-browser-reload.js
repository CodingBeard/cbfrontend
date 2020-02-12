module.exports = function (gulp, browserSync, conf, errorHandler) {
  return function browserReload(done) {
    browserSync.reload();
    done();
  };
};
