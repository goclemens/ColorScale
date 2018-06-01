import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default [
{
    input: 'src/ColorScale.js',
    output: {
        format: 'umd',
        name: 'ColorScale',
        file: 'builds/ColorScale.js'
    }
},
{
    input: 'src/ColorScale.js',
    output: {
        format: 'umd',
        name: 'ColorScale',
        file: 'builds/ColorScale.min.js'
    },
    plugins: [
        uglify()
    ]
},
{
    input: 'src/ColorScale.js',
    output: {
        format: 'umd',
        name: 'ColorScale',
        file: 'builds/ColorScaleFull.js'
    },
    plugins: [
        resolve(),
    ]
},
{
    input: 'src/ColorScale.js',
    output: {
        format: 'umd',
        name: 'ColorScale',
        file: 'builds/ColorScaleFull.min.js'
        // sourcemap: 'inline'
    },
    plugins: [
        resolve(),
        uglify()
    ]
}];