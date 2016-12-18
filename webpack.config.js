//make a "webpak.dev.config.js" without uglifyJsPlugin minifier later

var webpack = require("webpack");

// /**
//  * https://www.npmjs.com/package/webpack-livereload-plugin
//  * use with the chrome plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
//  */
// var LiveReloadPlugin = require('webpack-livereload-plugin');

/** helper to determine if a module is considered external*/
function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}

module.exports = {
    debug: true,
    entry: {
        //xlib: ["xlib"],
        "blib": ["./src/_index"],
    },
    output: {
        path: "./dist",
        filename: "[name].js",
        library: "[name]",
        libraryTarget:"commonjs2",
    },
    /** // Enable sourcemaps for debugging webpack's output.
    impacts perf a lot.  see: https://webpack.github.io/docs/build-performance.html
    */
    devtool: "source-map", //must use "source-map" otherwise maps don't match up to ts files (can view code, but not debug)

    resolve: {
        /** extensions are added to imports.   Add '.ts' and '.tsx' as resolvable extensions. */
        extensions: [
            "",
            ".webpack.js", ".web.js",
            ".ts", ".tsx"
            , ".js"
        ],
    },
    node: {
        /**no-ops the fs module if it's tried to be loaded (For example, source-map-loader tries to)*/
        fs: "empty",
        /** same issue with source-map-loader */
        module: "empty",
    },
    /**
	module.loaders

	A array of automatically applied loaders.

	Each item can have these properties:

	test: A condition that must be met
	exclude: A condition that must not be met
	include: A condition that must be met
	loader: A string of "!" separated loaders
	loaders: A array of loaders as string
	A condition can be a RegExp, an absolute path start, or an array of one of these combined with "and".

	exclude: [/bower_components/, /node_modules/] 
	*/
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: [
                    /\.tsx?$/
                ],
                loader: "ts-loader",
                include: [
                    /.*[/|\\]src[/|\\].*/,
                ],
                /** //only process local source files */
                exclude: [
                    /.*node_modules.*/,
                    /.*\.obj.*/,
                ],

            },
            // no-op a dependency of the source-map-support module, which provides proper loading/consumption of source maps (useful for typescript) on nodejs
            {
                test: /.*foo.js.map$/,
                loader: "null-loader",
            },

            ////es2015 to es5.  see https://github.com/babel/babel-loader
            ////requires npm install babel-loader babel-core babel-preset-es2015 --save-dev
            //{
            //    test: /\.js$/,
            //    loader: 'babel-loader',
            //    query: {
            //        presets: ['es2015'],
            //        cacheDirectory: [true],
            //    },
            //    exclude: /.*node_modules.webpack.*/, //excludes webpack internal modules, which fail preloads
            //}
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re­processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader",
                //include:/.*xlib.*/,  //if, for example, you want to only does sourcemaps for xlib.
                exclude: [
                    /.*node_modules.webpack.*/, //excludes webpack internal modules, which fail preloads
                    /.*source-map-support.js$/, //exclude the source-map-support module itself, as it has comments that cause warnings
                ],
            },
            //need this preloader because some npm modules we depend on have .json files they wish to load.  *shrug*
            { test: /\.json$/, loader: "json-loader" },
        ]
    },
    //// NOTE: we disable externals for this bootcamp because they are all bundled as part of the blib project.  
    //which is bundled into it's own "vendor" library' in other parts of this config file.
    //// When importing a module whose path matches one of the following, just
    //// assume a corresponding global variable exists and use that instead.
    //// This is important because it allows us to avoid bundling all of our
    //// dependencies, which allows browsers to cache those libraries between builds.
    //externals: {
    //	"react": "React",
    //	"react-dom": "ReactDOM",
    //},
    ////enable these when we get webpack modules working properly
    //builtin plugins such as webpack.optimize.* can be found here: 	https://webpack.github.io/docs/list-of-plugins.html#optimize
    plugins: [

        ////////////////////////////
        ////optimizations, enable these for production builds.   slows down dev builds
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //	compress: {
        //		warnings: false
        //	},
        //}),

        //////////////////////
        //bundle our main libraries into their own chunks
        ////follow http://stackoverflow.com/questions/35184240/webpack-error-in-commonschunkplugin-while-running-in-normal-mode-its-not-allow 
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: [
        //         "blib",
        //     ],
        //     minChunks: Infinity,
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: [
        //         "xlib",
        //     ],
        //     minChunks: Infinity,
        // }),

        // ///////////////////
        // // shared code modules in a multipage app
        // //implementation from http://stackoverflow.com/questions/30329337/how-to-bundle-vendor-scripts-separately-and-require-them-as-needed-with-webpack
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common-internal",
        //     filename: "common-internal.js",
        //     minChunks: function (module, count) {
        //         return !isExternal(module) && count >= 2; //adjustable cond
        //     },
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "base-vendors",
        //     filename: "base-vendors.js",
        //     minChunks: function (module, count) {
        //         return isExternal(module); //adjustable cond
        //     },
        // }),
        // /**
        // don't need options if you use the chrome plugin, but in case you need for something else....
        // options:
        // port - (Default: 35729) The desired port for the livereload server
        // hostname - (Default: localhost) The desired hostname for the appended <script> (if present) to point to
        // appendScriptTag - (Default: false) Append livereload <script> automatically to <head>.
        // ignore - (Default: null) RegExp of files to ignore. Null value means ignore nothing.
        // */
        // new LiveReloadPlugin({}),
    ],
    //eslint: {
    //    configFile: '.eslintrc'
    //},
};