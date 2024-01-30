const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = async () => {
    return {
        entry: "./index.ts",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "index.js",
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "node_modules/@cloudzeta/wasm"),
                        to: path.join(__dirname, "public/zetaWasm"),
                    }
                ]
            }),
            new HtmlPlugin({
                template: path.resolve(__dirname, "index.html"),
            }),
        ],

        resolve: {
            extensions: [".js", ".ts"],
        },

        module: {
            rules: [
                {
                    test: /\.(ts)$/,
                    exclude: /node_modules/,
                    use: [
                        "ts-loader",
                    ]
                },
            ]
        },

        devServer: {
            compress: true,
            port: 8848,

            onBeforeSetupMiddleware: function (devServer) {
                devServer.app.get("*", (req, res, next) => {
                    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
                    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
                    res.setHeader("Access-Control-Allow-Origin", "*");

                    // Continue to the next middleware/handler
                    next();
                });
            },
        },
    };
}
