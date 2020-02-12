module.exports = function (gulp, plugins, conf, errorHandler) {
  return function font(done) {

    let fontSources = conf.gulp.font.src;
    let sources = [];
    if(Array.isArray(fontSources))
    {
      for(let srcKey in fontSources)
      {
        if(fontSources.hasOwnProperty(srcKey))
        {
          sources[srcKey] = fontSources[srcKey] + ".+(eot|woff2|woff|ttf|svg)";
        }
      }
    }

    gulp.src(sources).pipe(gulp.dest(conf.gulp.font.dist));

    done();
  };

};
