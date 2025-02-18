import { ComposedAsset, ZetaEngineBeta, ZetaEngineInit } from "@cloudzeta/sdk/engine";

async function runZeta() {
    const canvasId = "zeta-sample-canvas";

    const engine: ZetaEngineBeta = await ZetaEngineInit({
        canvasId: canvasId,
        pixelRatio: 1.0,
        zetaUrlPrefix: "https://beta.zetabase.ai",
    }) as ZetaEngineBeta;

    console.log("Engine created successfully");

    engine.onSceneLoaded(() => {
        console.log("Scene loaded successfully");

        engine.composeScene("/z", "/zeta-logo.usd").then(async (composedAsset: ComposedAsset) => {
            await composedAsset.setTranslate([0, 100, -100]);
            await composedAsset.setRotateXYZ([0, 0, 0]);
        });
    });

    // Load a scene from Cloud Zeta, the same scene can be viewed at:
    // https://beta.zetabase.ai/player/m5vb8zahjcxf035x
    engine.loadScene("m5vb8zahjcxf035x");
}

runZeta();