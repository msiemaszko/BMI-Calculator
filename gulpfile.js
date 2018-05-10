const gulp        = require('gulp');
const browserSync = require('browser-sync'); 		// 1. załadowanie browser-synca
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');


const browserify = require('gulp-browserify');
// const babel = require('gulp-babel');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');

const paths = {
	src: "source",
	dist: "dist",

	styles: {
		src: 'source/scss/**/*.scss',
		css: 'source/css/',
		dest: 'dist/styles/',
		outStyleName: 'styles/styles.css'
	},

	html: {
		src: 'source/*.html',
		dest: 'dist/'
	},

	js: {
		src: 'source/**/*.js',
		dest: 'dist/'
	}
};

gulp.task('tsk_js', function() {
    // Single entry point to browserify
    gulp.src(paths.js.src)
    .pipe(browserify()) //{ insertGlobals : true }
    .pipe(gulp.dest(paths.js.dest))
});


gulp.task('tsk_serve', ['tsk_html'], function() {
	browserSync({
		server: paths.html.dest,
		// proxy: '127.0.0.1:80',				// tworzenie proxy do strony na serwerze
	});
	console.log('jop.');
});

gulp.task('tsk_html', function() {
	console.log("-> run tsk_html");
	return gulp.src(paths.html.src)
		// .pipe(gulp.dest(paths.html.dest))	// zwykle pompowanie plikow
		.pipe(htmlReplace({
			'css' : paths.styles.outStyleName,		// nazwa build : maska plików
			'js' : 'js/script.js'
		}))

		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true				// minifikacja html
		}))
		.pipe(gulp.dest(paths.html.dest))
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
		.pipe(concat('styles.css'))					// Konkatenacja (Concat) Plików CSS
		.pipe(sourcemaps.write())					// zapis sourcemapy do pliku

		.pipe(gulp.dest(paths.styles.dest))			// przekierowanie do folderu wyjściowego
		.pipe(browserSync.stream());				// wstrzyknięcie zmian do przeglądarki

		// gulp.run('tsk_css');
});


gulp.task('tsk_copy', function() {

	return gulp.src('source/fonts').pipe(gulp.dest('dist/fonts')); // kopiowanie czcionek

});

// gulp.task('tsk_js', () =>
// 	gulp.src(paths.js.src)
// 	//.pipe(sourcemaps.init())
// 	//.
// 	// return browserify
// 	.pipe(browserify())
// 	// .pipe(babel({
// 	// 	presets: [['env', {
// 	// 		"targets": {
// 	// 			"chrome": "66",
// 	// 			"firefox": "60"
// 	// 		}
// 	// 	}]]
// 	// }))
//
// 	// .pipe(concat('all.js'))
// 	//.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest(paths.js.dest))
// );


	// Obrobka skompilowanych plikow css
	// gulp.task('tsk_css', function() {
	// 	console.log('uruchomiono: tsk_css')
	// 	return gulp.src(paths.styles.css + "**.*css")
	// 		// .pipe(minifyCSS())						// Minifikacja Plików CSS
	// 		.pipe(concat("main.css"))
	// 		.pipe(gulp.dest(paths.styles.dest));
	// });

gulp.watch(paths.html.src, ['tsk_html']);
gulp.watch(paths.js.src, ['tsk_js']);
gulp.watch(paths.styles.src, ['tsk_sass']);


gulp.task('default', ['tsk_serve', 'tsk_sass', 'tsk_js', 'tsk_copy']);				// 5. chcemy zeby naszym domyślnym zadaniem było zadanie o nazwie 'serve'
