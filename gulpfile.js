var gulp = require('gulp'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
    clean = require('gulp-clean');
//清空文件夹，避免资源冗余

gulp.task('clean',function(){
    return gulp.src('./src/css',{read:false}).pipe(clean());
});

gulp.task('less',function(){
	gulp.src(['./build/less/*.less'])
		.pipe(less())
		.pipe(minifyCss({
			advanced: true,
			keepBreaks: false
		}))
		.pipe(gulp.dest('./src/css/'))
});


//preserveComments: all，保留所有注释；compress ：是否完全压缩

gulp.task('javascript',function(){
	gulp.src('./build/js/*.js')
		.pipe(uglify({
			compress: true,
//			preserveComments: all
		}))
		.pipe(gulp.dest('./src/js/'))
});

gulp.task('watch',function(){
	gulp.watch('./build/less/*.less',['less']);
});


gulp.task('watch3',function(){
	gulp.watch('./build/js/*.js',['javascript']);
});

gulp.task('default',['watch','clean','watch3']);