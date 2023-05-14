const cssnano = require('cssnano')

module.exports = {
    plagins: [
        ["postcss-preset-env", 
    {}],
    cssnano({ preset: 'default' })]
}