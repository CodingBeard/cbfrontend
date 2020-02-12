module.exports = function (gulp, plugins, conf, errorHandler) {
  return function img() {

    let imgSources = conf.assets.src;
    let sources = [];
    if(Array.isArray(imgSources))
    {
      for(let srcKey in imgSources)
      {
        if(imgSources.hasOwnProperty(srcKey))
        {
          sources[srcKey] = imgSources[srcKey] + ".+(png|jpeg|jpg)";
        }
      }
    }

    return (
      gulp.src(sources)
        .pipe(
          plugins.rename(
            function (path) {
              path.basename += path.extname;
            }
          )
        )
        .pipe(plugins.webp())
        .pipe(gulp.dest(conf.assets.dist))
    );
  };
};
