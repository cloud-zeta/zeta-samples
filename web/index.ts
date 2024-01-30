import { ZetaAppConfig, ZetaEngine } from "@cloudzeta/engine";
import { ZetaScene } from "@cloudzeta/wasm";

const appConfig: ZetaAppConfig = {
    appId: "1:979343534807:web:91ae6fc214cbf85708de92",
    apiKey: "AIzaSyBBDfxgpOAnH7GJ6RNu0Q_v79OGbVr1V2Q",
};

ZetaEngine.createEngine(appConfig).then((engine) => {
    console.log("Engine created successfully");

    engine.onSceneLoaded((scene: ZetaScene) => {
        console.log("Scene loaded successfully");
    });
    engine.loadScene("lrk8p6fa0enkik1t", "zeta-sample-canvas");
});