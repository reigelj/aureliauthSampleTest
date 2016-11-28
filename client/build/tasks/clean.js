var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

// Removes all modules from the client directory 
// TODO: Find a way to clean server directory modules as well from here (Low priority)
gulp.task('deep-clean', function(){
  return gulp.src([paths.output, paths.npmModules, paths.jspmModules])
    .pipe(vinylPaths(del));
});
