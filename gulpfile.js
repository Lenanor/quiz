var gulp = require( 'gulp');

// Plugins
var sass = require('gulp-sass'); 			          // Require the gulp-sass plugin
var autoprefixer = require('gulp-autoprefixer');      // Lägger till autoprefix via db på caniuseit.com
var uglify = require('gulp-uglify');		          // Minifierar js
var concat = require('gulp-concat');
var bs = require('browser-sync').create();


// Tasks
gulp.task( 'sass', function(){
	return gulp.src('src/scss/**/*.scss')             // Get source files with gulp.src
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(autoprefixer())					  // Sends it through a gulp plugin (sass)
			.pipe(gulp.dest('css'))
			.pipe(bs.reload({ stream: true }))       // Outputs the file in the destination folder
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
			.pipe(concat('all.js'))
			.pipe(uglify({ preserveComments: 'all'}))
			.pipe(gulp.dest('./js'));
});

gulp.task('browser-sync', ['sass'], function() { 
	bs.init({
        server: {
                baseDir: "./"
		}
	})

});

// Watch
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch( 'src/scss/**/*.scss', ['sass']);
	gulp.watch("src/js/**/*.js", ['scripts']); 
	gulp.watch("*.html").on("change", bs.reload);
});											