const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    // UMD build for browsers
    {
        entry: './src/index.ts',
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'dhvagna-dom.min.js',
            library: {
                name: 'dhvagnaDom',
                type: 'umd',
                export: 'default'
            },
            globalObject: 'this'
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()]
        }
    },
    // ESM build for modern environments
    {
        entry: './src/index.ts',
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.esm.js',
            library: {
                type: 'module'
            }
        },
        experiments: {
            outputModule: true
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()]
        }
    }
];