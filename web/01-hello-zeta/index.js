async function runZeta() {
    const canvasId = "zeta-sample-canvas";

    const engine = await ZetaEngine.ZetaEngineInit({
        canvasId: canvasId,
        pixelRatio: 1.0,
        zetaUrlPrefix: "https://beta.zetabase.ai",
    });

    console.log("Engine created successfully");

    engine.onSceneLoaded(() => {
        console.log("Scene loaded successfully");
    });

    // Load a scene from Cloud Zeta, the same scene can be viewed at:
    // https://beta.zetabase.ai/player/m5vb8zahjcxf035x
    engine.loadScene("m5vb8zahjcxf035x");
}

runZeta();