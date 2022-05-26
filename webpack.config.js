const path = require('path')
const pkg = require('./package.json')
const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const packageJson = require('./package.json')
module.exports = {
    context: ROOT,
    entry: {
        main: './index.ts',
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './bundle-analysis.html',
            openAnalyzer: false,
        }),
    ],
    output: {
        publicPath: `/api/assets-gateway/raw/package/QHlvdXdvbC9wbGF0Zm9ybS1lc3NlbnRpYWxz/${packageJson.version}/dist/`,
        path: DESTINATION,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: pkg.name,
        filename: pkg.name + '.js',
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [ROOT, 'node_modules'],
    },
    externals: [
        {
            rxjs: 'rxjs',
            'rxjs/operators': {
                commonjs: 'rxjs/operators',
                commonjs2: 'rxjs/operators',
                root: ['rxjs', 'operators'],
            },
            '@youwol/os-core': '@youwol/os-core',
            '@youwol/flux-view': '@youwol/flux-view',
        },
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './src'),
        },
        compress: true,
        port: 9000,
    },
}
