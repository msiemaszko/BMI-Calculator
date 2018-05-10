const gulp        	= require('gulp');

const browserSync 	= require('browser-sync');
const sass 			= require('gulp-sass');
const sourcemaps 	= require('gulp-sourcemaps');
const autoprefixer 	= require('gulp-autoprefixer');
const minifyCSS 	= require('gulp-clean-css');
const concat 		= require('gulp-concat');

const htmlReplace 	= require('gulp-html-replace');
const htmlMin 		= require('gulp-htmlmin');

const uglify 		= require('gulp-uglify');
const changed 		= require('gulp-changed');
const clean 		= require('gulp-clean');;

const browserify 	= require('browserify');
const babelify		= require('babelify');
const source		= require('vinyl-source-stream');
const buffer		= require('vinyl-buffer');

const paths = {
	src: 'source/',
	dest: 'dist/',
	build: 'build/',

	styles: {
		src: 'source/scss/**/*.scss',
		css: 'source/css/',
		dest: 'dist/styles/',
		outStyleName: 'main.css'
	},
	html: {
		src: 'source/*.html',
		dest: 'dist',
		build: 'build'
	},
	js: {
		src: 'source/**/*.js',
		dest: 'dist',

		source_js: 'source/js/main.js',
		concat_js: 'js/bundle.js',
		maps: 'js/maps/'
	},
	images: {
		src: 'source/img/*.{jpg,png,gif}',
		out: 'dist/img',
		build: 'build/img'
	},
	docs: {
		src: 'source/doc/*.{doc,pdf,txt,md}',
		out: 'dist/doc',
		build: 'build/doc'
	},
	fonts: {
		src: 'source/fonts/*.ttf',
		out: 'dist/fonts',
		build: 'build/fonts'
	}
};

gulp.task('tsk_serve', function() {
	browserSync({
		server: paths.html.dest,
		// proxy: '127.0.0.1:80',				// tworzenie proxy do strony na serwerze
	});
	console.log('-> gulp serve start');
});

// to dziala - wersja 1
// gulp.task('tsk_js', function() {
//     // Single entry point to browserify
//     gulp.src(paths.js.src)
//     .pipe(browserify()) //{ insertGlobals : true }
//     .pipe(gulp.dest(paths.js.dest))
// });

gulp.task('tsk_js', function () {
	return browserify(paths.js.source_js)
		.transform('babelify', {presets: ['env']})
		.bundle()
		.pipe(source(paths.js.concat_js)) // Readable Stream -> Stream Of Vinyl Files
		.pipe(buffer()) // Vinyl Files -> Buffered Vinyl Files
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.stream());
});




gulp.task('tsk_html', function() {
	console.log("-> run tsk_html");
	gulp.src(paths.html.src)
		//.pipe(htmlReplace({							// zamiana wielu styli w jeden
		//	'css' : paths.styles.outStyleName,		// nazwa build : maska plików
		//	'js' : 'js/bundle.js'				// tutaj jeszcze zmienic !
		//}))

		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true				// minifikacja html
		}))
		.pipe(gulp.dest(paths.html.dest))

	browserSync.reload();
	return;
});

// konfiguracja preprocesora Sass + sourcemaps + autoprefixer
gulp.task('tsk_sass', function() {
	console.log("-> run tsk_sass");
	return gulp.src(paths.styles.src)			// ładuje do streama folder wejściowy

		.pipe(sourcemaps.init())					// inicjalizacja sourcemaps
		.pipe(sass().on('error', sass.logError))	// kompilowanie z obsługa błędów
		.pipe(autoprefixer({						// wstawianie prefiksów
			browsers: ['last 3 versions']
		}))
		.pipe(minifyCSS())							// Minifikacja Plików CSS
		.pipe(concat(paths.styles.outStyleName))					// Konkatenacja (Concat) Plików CSS
		.pipe(sourcemaps.write())					// zapis sourcemapy do pliku

		.pipe(gulp.dest(paths.styles.dest))			// przekierowanie do folderu wyjściowego
		.pipe(browserSync.stream());				// wstrzyknięcie zmian do przeglądarki

		// gulp.run('tsk_css');
});


	// Obrobka skompilowanych plikow css
	// gulp.task('tsk_css', function() {
	// 	console.log('uruchomiono: tsk_css')
	// 	return gulp.src(paths.styles.css + "**.*css")
	// 		// .pipe(minifyCSS())						// Minifikacja Plików CSS
	// 		.pipe(concat("main.css"))
	// 		.pipe(gulp.dest(paths.styles.dest));
	// });
	//

// Czyszczenie
gulp.task('clean', function(){
	console.log('Czyszczenie katalogu dist/');
	return gulp.src(paths.dest + '**/*')
		.pipe(clean())
});

// kopiowanie pozostalych plikow
gulp.task('tsk_copy', function() {

	// copy changed images
	gulp.src(paths.images.src)
		.pipe(changed(paths.images.out))
		.pipe(gulp.dest(paths.images.out));

	// copy documentation
	gulp.src(paths.docs.src)
		.pipe(changed(paths.docs.out))
		.pipe(gulp.dest(paths.docs.out));

	// copy fonts
	gulp.src(paths.fonts.src)
		.pipe(changed(paths.fonts.out))
		.pipe(gulp.dest(paths.fonts.out));

	return;
});


// Watchery
gulp.watch(paths.html.src, ['tsk_html']);
gulp.watch(paths.js.src, ['tsk_js']);
gulp.watch(paths.styles.src, ['tsk_sass']);

// gulp default
gulp.task('default', ['tsk_serve', 'tsk_html', 'tsk_sass', 'tsk_js', 'tsk_copy']);				// 5. chcemy zeby naszym domyślnym zadaniem było zadanie o nazwie 'serve'
