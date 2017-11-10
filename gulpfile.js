var nodemon = require('gulp-nodemon');
var gulp = require('gulp');


gulp.task('serve-dev', function() {
  var options = {
    script: './app.js',
    execMap: {
      "js": "node --harmony"
    },
    env: {
      'PORT': 4000,
      'NODE_ENV': 'dev'
    },
    watch: ['./']
  };

  return nodemon(options);
})
