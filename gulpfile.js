const gulp        = require('gulp');
const browserSync = require('browser-sync'); 		// 1. załadowanie browser-synca
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');

const paths = {
	styles: {
		src: 'source/scss/**/*.scss',
		css: 'source/css/',
		dest: 'dist/styles/',
		outStyleName: 'styles/styles.css'
	},

	html: {
		src: 'source/*.html',
		dest: 'dist/'
	}
};


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
		.pipe(browserSync.stream());
});

// konfiguracja preprocesora Sass + sourcemaps + autoprefixer
gulp.task('tsk_sass', function() {
	console.log("-> run tsk_sass");
	gulp.src(paths.styles.src)			// ładuje do streama folder wejściowy

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

	// Obrobka skompilowanych plikow css
	// gulp.task('tsk_css', function() {
	// 	console.log('uruchomiono: tsk_css')
	// 	return gulp.src(paths.styles.css + "**.*css")
	// 		// .pipe(minifyCSS())						// Minifikacja Plików CSS
	// 		.pipe(concat("main.css"))
	// 		.pipe(gulp.dest(paths.styles.dest));
	// });




gulp.watch(paths.html.src, ['tsk_html']);
gulp.watch(paths.styles.src, ['tsk_sass']);

// var sass = require('gulp-sass');				// załadowanie sass'a
// var sourcemaps = require('gulp-sourcemaps');
// var autoprefixer = require('gulp-autoprefixer');

// zadanie przeladowujace strone
// gulp.task('reload', function() {				// 4. zadanie reload
// 	browserSync.reload();						// pełne przeładowanie okna przeglądarki
// })
//
// // konfiguracja browser-synca
// gulp.task('serve', ['sass'], function() {		// 2. tworzenie zadania 'serve'
// 	browserSync({
// 		server: 'src', 							// uruchomienie lokalnego serwera ze źródłem plików ./src
// 		// proxy: '127.0.0.1:80',				// tworzenie proxy do strony na serwerze
// 		// ws: true								// poszukać co to jest!?
// 	});
// 	gulp.watch('src/*.html', ['reload']);		// 3. nasłuch na zmianę html w folderze src
// 	gulp.watch('src/scss/**/*.scss', ['sass']);	// +  nasłuch na zaminę plików scss
// });
//
// // konfiguracja preprocesora Sass
// gulp.task('sass', function() {
// 	return gulp.src('src/scss/**/*.scss')			// folder z plikami scss
// 		.pipe(sourcemaps.init())					// inicjalizacja sourcemaps
// 		.pipe(sass().on('error', sass.logError))	// kompilowanie z obsługa błędów
// 		.pipe(sourcemaps.write())					// zapis sourcemapy do pliku
// 		.pipe(gulp.dest('src/css'))					// folder wyjsciowy
// 		.pipe(browserSync.stream())					// wstrzyknięcie zmian?
// });

gulp.task('default', ['tsk_serve', 'tsk_sass']);				// 5. chcemy zeby naszym domyślnym zadaniem było zadanie o nazwie 'serve'
