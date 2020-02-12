module.exports = function (gulp, browserSync, conf, errorHandler, plugins) {
  return function watcher() {
    let watcherSources = conf.assets.src;
    let jsWatchSrc = [];
    let scssWatchSrc = [];
    let tsWatchSrc = [];
    let fontWatchSrc = [];
    let markupWatchSrc = [];
    let toWatch = conf.gulp.watch;

    if(Array.isArray(watcherSources))
    {
      for(let srcKey in watcherSources)
      {
        if(watcherSources.hasOwnProperty(srcKey))
        {
          jsWatchSrc[srcKey] = watcherSources[srcKey] + ".js";
          scssWatchSrc[srcKey] = watcherSources[srcKey] + ".scss";
          tsWatchSrc[srcKey] = watcherSources[srcKey] + ".ts";
          fontWatchSrc[srcKey] = watcherSources[srcKey] + ".+(eot|woff2|woff|ttf|svg)";
          markupWatchSrc[srcKey] = watcherSources[srcKey] + ".phtml";
        }
      }
    }

    if(Array.isArray(toWatch))
    {

      if(toWatch.includes('js'))
      {

        gulp.watch(
          jsWatchSrc,
          gulp.series(plugins.js, plugins.browserReload)
        ).on('error', errorHandler);

      }

      if(toWatch.includes('scss'))
      {

        gulp.watch(
          scssWatchSrc,
          gulp.series(plugins.scss, plugins.browserReload)
        ).on('error', errorHandler);

      }

      if(toWatch.includes('font'))
      {

        gulp.watch(
          fontWatchSrc,
          gulp.series(plugins.font, plugins.browserReload)
        ).on('error', errorHandler);

      }

      if(toWatch.includes('markup'))
      {

        gulp.watch(
          markupWatchSrc,
          gulp.series(plugins.browserReload)
        ).on('error', errorHandler);

      }

    } else
    {
      gulp.watch(
        jsWatchSrc,
        gulp.series(plugins.js, plugins.browserReload)
      ).on('error', errorHandler);

      // Styling task watcher
      gulp.watch(
        scssWatchSrc,
        gulp.series(plugins.scss, plugins.browserReload)
      ).on('error', errorHandler);

      // Font task watcher
      gulp.watch(
        fontWatchSrc,
        gulp.series(plugins.font, plugins.browserReload)
      ).on('error', errorHandler);

      // Template task watcher
      gulp.watch(
        markupWatchSrc,
        gulp.series(plugins.browserReload)
      ).on('error', errorHandler);
    }
  };
};
