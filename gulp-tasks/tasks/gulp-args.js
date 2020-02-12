module.exports = function (gulp, conf, errorHandler) {
  let argv = require('yargs').argv;

  return function args(done) {

      if(typeof argv.env !== "undefined")
      {
        if(argv.env === "dev" || argv.env === "test" || argv.env === "prod")
        {
          conf['env'] = argv.env;
        }
      }

      done();
    }
};
