'use strict';

const path = require('path');

module.exports = {
    context: {
        breakpoints: require(path.join(
            process.cwd(),
            'src/tokens/breakpoints.json'
        )),
        colors: require(path.join(process.cwd(), 'src/tokens/colors.json')),
        fonts: require(path.join(process.cwd(), 'src/tokens/fonts.json')),
        layers: require(path.join(process.cwd(), 'src/tokens/layers.json')),
        sizes: require(path.join(process.cwd(), 'src/tokens/sizes.json'))
    }
};
