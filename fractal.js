'use strict';

// --------------------------------------------------------
// Fractal configuration
// --------------------------------------------------------

//PATHS
const paths = {
    static: `${__dirname}/public`,
    src: `${__dirname}/src`,
    build: `${__dirname}/styleguide`
};

//FRACTAL MODULE
const fractal = require('@frctl/fractal').create();

//TITLE CONFIG
fractal.set('project.title', 'Shed fractal.build Starterpack');

//FRACTAL UI THEME CONFIG
const shedTheme = require('@frctl/mandelbrot')({
    lang: 'en-gb',
    skin: 'black',
    styles: ['default', '/assets/css/styleguide.css'],
    static: {
        mount: 'fractal'
    }
});
fractal.web.theme(shedTheme);

// --------------------------------------------------------
// Components
// --------------------------------------------------------

//COMPONENTS CONFIG
fractal.components.set('path', `${paths.src}/components`);
fractal.components.set('default.preview', '@preview');

//COMPONENT STATUSES CONFIG
fractal.components.set('default.status', null);
fractal.components.set('statuses', {
    prototype: {
        label: 'Prototype 💡',
        description: 'Do not implement.',
        color: '#FF3333'
    },
    wip: {
        label: 'wip 🏋️‍',
        description: 'Work in progress.',
        color: '#ff3800'
    },
    error: {
        label: 'not working 🚨',
        description: 'Not working',
        color: '#ff033e'
    },
    ready: {
        label: 'ready 🍭',
        description: 'Component is ready',
        color: '#00ff7f'
    }
});

// --------------------------------------------------------
// Docs
// --------------------------------------------------------

//DOCS CONFIG
const nunjucksAdapter = require('@frctl/nunjucks');

const nunj = nunjucksAdapter({
    paths: [require.resolve('@frctl/mandelbrot') + '/../views'],
    globals: {
        frctl: fractal
    }
});

fractal.docs.engine(nunj);
fractal.docs.set('path', `${paths.src}/docs`);

// --------------------------------------------------------
// Assets
// --------------------------------------------------------

//STATIC ASSETS
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);

//EXPORT CONFIG
module.exports = fractal;
