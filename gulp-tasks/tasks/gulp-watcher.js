module.exports = function (gulp, browserSync, conf, errorHandler, plugins) {
  return function watcher() {
    let watcherSources = conf.assets.src;
    let jsWatchSrc = [];
    let scssWatchSrc = [];
    let fontWatchSrc = [];

    if (Array.isArray(watcherSources))
    {
      for (let srcKey in watcherSources)
      {
        if (watcherSources.hasOwnProperty(srcKey))
        {
          jsWatchSrc[srcKey] = watcherSources[srcKey] + ".js";
          scssWatchSrc[srcKey] = watcherSources[srcKey] + ".scss";
          fontWatchSrc[srcKey] = watcherSources[srcKey] + ".+(eot|woff2|woff|ttf|svg)";
        }
      }
    }

    function sleep(cb) {
      setTimeout(function() { cb(); }, 1000);
    }

    gulp.watch(
      jsWatchSrc,
      {interval: 1000, usePolling: true},
      gulp.series(plugins.js, sleep, plugins.browserReload)
    ).on('error', errorHandler);

    // Styling task watcher
    gulp.watch(
      scssWatchSrc,
      {interval: 1000, usePolling: true},
      gulp.series(plugins.scss, sleep, plugins.browserReload)
    ).on('error', errorHandler);

    // Font task watcher
    gulp.watch(
      fontWatchSrc,
      {interval: 1000, usePolling: true},
      gulp.series(plugins.font, sleep, plugins.browserReload)
    ).on('error', errorHandler);

  };
};
