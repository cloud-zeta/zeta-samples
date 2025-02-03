import { ZetaEngineBeta, ZetaEngineInitWithToken } from "@cloudzeta/engine";

async function runZeta() {
    const canvasId = "zeta-sample-canvas";

    // Generate a new user token from: https://beta.zetabase.ai/settings
    // and replace the tokenUid and encryptionKey below.
    //
    // WARNING: Do not commit the tokenUid and encryptionKey to version control.
    const engine: ZetaEngineBeta = await ZetaEngineInitWithToken({
        canvasId: canvasId,
        pixelRatio: 1.0,
        zetaUrlPrefix: "https://beta.zetabase.ai"
    },
        "put-tokenUid-here",
        "put-encryptionKey-here"
    ) as ZetaEngineBeta;

    console.log("Engine created successfully");

    engine.onSceneLoaded(() => {
        console.log("Scene loaded successfully");

        engine.scene.SetEnableRenderEnvironmentMap(true);

        // Enable editing mode.
        engine.scene.SetEditMode(window.ZetaWasm.ZetaRendererEditMode.Editing);

        // Enable picking primitives.
        engine.scene.SetPickMode(window.ZetaWasm.ZetaRendererPickMode.Prims);
    });

    // Load a scene from Cloud Zeta, the same scene can be viewed at:
    // https://beta.zetabase.ai/player/m5vb8zahjcxf035x
    engine.loadScene("m5vb8zahjcxf035x");
}

runZeta();