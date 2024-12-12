ZetaEngine.ZetaInit({
    appId: "1:979343534807:web:91ae6fc214cbf85708de92",
    apiKey: "AIzaSyBBDfxgpOAnH7GJ6RNu0Q_v79OGbVr1V2Q",

    // override the default worker path, make sure it matches the path in webpack.config.js
    workerPath: "zetaEngine",
});

const canvasId = "zeta-sample-canvas";

ZetaEngine.ZetaEngineCreate({
    canvasId: canvasId,
    pixelRatio: 1.0,

    // override the default wasm path, make sure it matches the path in webpack.config.js
    wasmPath: "zetaWasm",
}).then((engine) => {
    console.log("Engine created successfully");

    engine.onSceneLoaded(() => {
        console.log("Scene loaded successfully");
    });

    // Load a scene from Cloud Zeta, the same scene can be viewed at:
    // https://cloudzeta.com/player/lt3k51km833tfl3d
    engine.loadScene("lt3k51km833tfl3d");
});