import { ZetaEngine, ZetaEngineCreate, ZetaInit } from "@cloudzeta/engine";

ZetaInit({
    appId: "1:979343534807:web:91ae6fc214cbf85708de92",
    apiKey: "AIzaSyBBDfxgpOAnH7GJ6RNu0Q_v79OGbVr1V2Q",
});

const canvasId = "zeta-sample-canvas";

ZetaEngineCreate({
    canvasId: canvasId,
    pixelRatio: 1.0,
}).then((engine: ZetaEngine) => {
    console.log("Engine created successfully");

    engine.onSceneLoaded(() => {
        console.log("Scene loaded successfully");
    });
    engine.loadScene("lt3k51km833tfl3d");
});