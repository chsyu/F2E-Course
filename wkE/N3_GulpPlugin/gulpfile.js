var gulp = require('gulp'),
watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('Hello GULP !!!');
});

gulp.task('html', function() {
  console.log('HTML task ...');
});

gulp.task('styles', function() {
  console.log('STYLES task ...');
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
