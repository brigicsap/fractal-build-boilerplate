
// --------------------------------------------------------
// Dependencies
// --------------------------------------------------------

const pkg = require('./package.json');

// Fractal
const fractal = require('./fractal.js');
const logger = fractal.cli.console;

// Utils
const del = require('del');
const gulp = require('gulp');

// JavaScript
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// CSS
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const importer = require('postcss-easy-import');
const mapper = require('postcss-map');
const autoprefixer = require('autoprefixer');
const nano = require('cssnano');
const assets = require('postcss-assets');
const customMedia = require('postcss-custom-media');
const mediaMinMax = require('postcss-media-minmax');
const responsiveType = require('postcss-responsive-type');

// Revision
const rev = require('gulp-rev');
const collect = require('gulp-rev-collector');

// Misc
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');

// --------------------------------------------------------
// Configuration
// --------------------------------------------------------

// Paths
const paths = {
  src: `${__dirname}/src`,
  modules: `${__dirname}/node_modules`,
  build: `${__dirname}/styleguide`,
  dest: `${__dirname}/public`
};

// PostCSS plugins
const processors = [
  importer({
    glob: true,
  }),
  mapper({
    maps: [
      `${paths.src}/tokens/breakpoints.json`,
      `${paths.src}/tokens/colors.json`,
      `${paths.src}/tokens/fonts.json`,
      `${paths.src}/tokens/layers.json`,
      `${paths.src}/tokens/sizes.json`,
    ],
  }),
  assets({
    loadPaths: [`${paths.src}/assets/vectors`],
  }),
  responsiveType,
  customMedia,
  mediaMinMax,
  autoprefixer,
  nano
];

// JavaScript files
const modules = [
  `${paths.modules}/svg4everybody/dist/svg4everybody.js`,
  `${paths.src}/assets/scripts/app.js`,
  `${paths.src}/components/**/*.js`,
];

const svgConfig = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'sprite', // destination foldeer
      sprite: 'sprite.svg' // sprite name
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};


// --------------------------------------------------------
// Tasks
// --------------------------------------------------------

// Build static site
function build() {
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));

  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}

// Serve dynamic site
function serve() {
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));

  return server.start().then(() => {
    logger.success(`Shed fractal.build Starterpack is now running at ${server.url}`);
      console.log(`Local URL: ${server.url}`);
      console.log(`Network URL: ${server.urls.sync.external}`);
  });
}

// Clean
function clean() {
  return del([
    `${paths.dest}/assets/css/*.css`
    ], {force: true});
  }

function revision() {
  return gulp.src(revisionConfig.src.assets, {
      base: revisionConfig.src.base
    })
    .pipe(rev())
    .pipe(gulp.dest(revisionConfig.dest.assets))
    .pipe(rev.manifest({ path: revisionConfig.dest.manifest.name }))
    .pipe(gulp.dest(revisionConfig.dest.manifest.path));
}

// Meta
function meta() {
  return gulp.src(`${paths.src}/*.{txt,json}`)
    .pipe(gulp.dest(paths.dest));
}

// Images
function images() {
  return gulp.src(`${paths.src}/assets/images/**/*`)
    .pipe(gulp.dest(`${paths.dest}/images`));
}

// SVG Icon System
function svgs() {
  return gulp.src(`${paths.src}/assets/svgs/*.svg`)
    .pipe(svgo())
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(`${paths.dest}/svgs`));
}

// Fonts
function fonts() {
  return gulp.src(`${paths.src}/assets/fonts/**/*`)
    .pipe(gulp.dest(`${paths.dest}/fonts`));
}

// Scripts
function scripts() {
  return gulp.src(modules)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [['env', { modules: false }]],
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dest}/assets/js`));
}

// Styles
function styles() {
  return gulp.src(`${paths.src}/assets/sass/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dest}/assets/css`));
}

// Watchs
function watch() {
  serve();
  gulp.watch(`${paths.src}/assets/svgs`, svgs);
  gulp.watch(`${paths.src}/assets/images`, images);
  gulp.watch(`${paths.src}/assets/fonts`, fonts);
  gulp.watch(`${paths.src}/**/*.js`, scripts);
  gulp.watch(`${paths.src}/**/*.scss`, styles);
}

// Task sets
const compile = gulp.series(clean,
                  gulp.parallel(meta, images, svgs, fonts, scripts, styles)
                );

gulp.task('start', gulp.series(compile, serve));
gulp.task('build', gulp.series(compile, build));
gulp.task('dev', gulp.series(compile, watch));
gulp.task('scripts', gulp.series(scripts));
