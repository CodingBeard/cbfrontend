module.exports = function (gulp, browserSync, conf, errorHandler) {
  return function browserSyncProxy(done) {
    browserSync.init(
      {
        proxy: "docker.for.mac.localhost:82",
        open: false
      }
    );
    done();
  };

};
