const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const compass = require('gulp-compass');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const settings = {
	js: { source: 'scripts/maximised/', dest: 'scripts/scripts.min.js' },
	css: { source: 'css/sass/', dest: 'css/style.css' },
}

function plumberError( error ){

	console.log( '[' + error.plugin + ']: ' + error.message );
	
	this.emit( 'end' );
	
}

/* Fill the `settings` object with the supplied arguments */
function processArguments(){
	
	var pargs = [...process.argv];
	var args = pargs.slice( pargs.indexOf( pargs.find( s => s.indexOf('--') === 0 ) ) || 0 );
	var key = args[ 0 ].replace( /-/g, '' );
	var index = 0;
	
	args.forEach(arg => {
		
		if( arg.indexOf('-') == 0 ){
			
			key = arg.replace( /-/g, '' );
			index = 0;
			settings[ key ] = settings[ key ] || {};
			
		} else if( index === 1 ){
		
			settings[ key ].source = arg;
		
		} else if( index === 2 ){
			
			settings[ key ].dest = arg;
			
		}
		
		index++;
		
	});
	
}

/* Compile folder to file (JS) */
function javascriptCompilation( folderPath = settings.js.source, toFilePath = settings.js.dest ){
	
	folderPath = folderPath[ folderPath.length - 1 ] === '/'
		? folderPath : folderPath + '/';
		
	var tmp = gulp.src([ './' + folderPath + '*.js' ]);
	
	tmp = tmp.pipe( plumber( plumberError ) );
	tmp = tmp.pipe( babel({
		presets: [ 'es2015-ie' ]
	}) );
	tmp = tmp.pipe( minify({
        ext: { min: '.min.js' },
        noSource: true
    }) );
	tmp = tmp.pipe( uglify() );
	tmp = tmp.pipe( concat( toFilePath.split('/').pop() ) );
	tmp = tmp.pipe( gulp.dest( './' + toFilePath.split('/').slice( 0, -1 ) ) );
	
	return tmp;
	
}

/* Compile folder to file (CSS) */
function cssCompilation( folderPath = settings.css.source, toFilePath = settings.css.dest ){
	
	folderPath = folderPath[ folderPath.length - 1 ] === '/'
		? folderPath : folderPath + '/';
		
	var tmp = gulp.src([ './' + folderPath + '*.scss' ]);
	
	tmp = tmp.pipe( plumber( plumberError ) )
	tmp = tmp.pipe( compass({
		css: './css/',
		sass: folderPath,
		image: './images/'
	}) )
	tmp = tmp.pipe( autoprefixer({ browsers: [
		'last 2 version',
		'safari 5',
		'ie 7', 'ie 8', 'ie 9',
		'opera 12.1',
		'ios 6', 'android 4'
	]}) );
	
	tmp = tmp.pipe( cleanCSS() );
	tmp = tmp.pipe( concat( toFilePath.split('/').pop() ) );
	tmp = tmp.pipe( gulp.dest( './' + toFilePath.split('/').slice( 0, -1 ) ) );
	
	return tmp;
	
}

/* Run only JS compilation */
gulp.task('js', function(){
	
	processArguments();
	
	return javascriptCompilation();
	
});

/* Run only CSS compilation */
gulp.task('css', function(){
	
	processArguments();
	
	return cssCompilation();
	
});

/* Run CSS and JS compilation */
gulp.task('compile', function(){
	
	processArguments();
	
	return [
		gulp.start('css'),
		gulp.start('js')
	];
	
})

/* Watch CSS and JS files, compile when changed */
gulp.task('watch', function(){

	gulp.start('compile');
	
	watch( settings.css.source, function(){
	
		return gulp.start('css');
	
	});
	
	watch( settings.js.source, function(){ 
		
		return gulp.start('js');
	
	});
	
});

/* Display a manual for this Gulp */
gulp.task('man', function(){
	
	console.log(`

The following gulp commands are available:

	$ gulp compile [ --js srcPath destFileAndPath ] [ --css srcPath destFileAndPath ]

Compile aribitrary files.

	$ gulp css [ --css srcPath destFileAndPath ]
	
Compile CSS files

	$ gulp js [ --js srcPath destFileAndPath ]

Compile Javascript files

	$ gulp watch [ --js srcPath destFileAndPath ] [ --css srcPath destFileAndPath ]

Watch files in the srcPaths and compile to the destFileAnPath.

The default sources and destinations are:

	js: 'scripts/maximised/' -> 'scripts/scripts.min.js'
	css: 'css/sass/' -> 'css/style.css'

	`);

});

/* Run `gulp man` when no arguments are supplied */
gulp.task('default', function(){
	
	return gulp.start('man');
	
})