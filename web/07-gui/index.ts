import { ZetaGui } from "@cloudzeta/sdk/gui";

let zetaGui: ZetaGui = null;
const uiDivFull = document.getElementById("zeta-sample-ui-div-full") as HTMLDivElement;
const uiDivMini = document.getElementById("zeta-sample-ui-div-mini") as HTMLDivElement;
const boxSceneUid = "m7gxcsdlkbixvfxt";
const logoSceneUid = "m5vb8zahjcxf035x";

async function initZeta() {
    zetaGui = await ZetaGui.init(uiDivFull, {
        zetaUrlPrefix: "https://beta.zetabase.ai",
        pixelRatio: 1.0,
    });

    if (!zetaGui.engine.scene) {
        await zetaGui.loadScene(boxSceneUid);
    }
}

initZeta();

document.getElementById("zeta-sample-ui-button-load-box").addEventListener("click", () => {
    zetaGui.loadScene(boxSceneUid);
});

document.getElementById("zeta-sample-ui-button-load-logo").addEventListener("click", () => {
    zetaGui.loadScene(logoSceneUid);
});

document.getElementById("zeta-sample-ui-button-unload").addEventListener("click", () => {
    zetaGui.unloadScene();
});

document.getElementById("zeta-sample-ui-button-full-screen").addEventListener("click", () => {
    zetaGui.mountInto(uiDivFull);
});

document.getElementById("zeta-sample-ui-button-mini-screen").addEventListener("click", () => {
    zetaGui.mountInto(uiDivMini);
});
