module.exports = function (gulp, plugins, conf, errorHandler) {
  let flexibility = require('postcss-flexibility');
  let cssnano = require('cssnano');

  return function scss(done) {

    let scssSources = conf.assets.src;
    let sources = [];

    if(Array.isArray(scssSources))
    {
      for(let srcKey in scssSources)
      {
        if(scssSources.hasOwnProperty(srcKey))
        {
          sources[srcKey] = scssSources[srcKey] + ".scss";
        }
      }
    }

    gulp.src(sources)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassGlob())
        .pipe(
          plugins
            .sass({includePaths: conf.gulp.scss.inputPaths})
            .on('error', errorHandler)
        )
        .pipe(
          plugins.rename(
            function (path) {
              path.basename += ".min";
            }
          )
        )
        .pipe(plugins.postcss([flexibility(), cssnano()]))
        .pipe(plugins.sourcemaps.write('./', {addComment: false}))
        .pipe(gulp.dest(conf.assets.dist))
        .on('error', errorHandler);

    done();
  };
};
