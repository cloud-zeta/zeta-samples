import { ZetaGui } from "@cloudzeta/sdk/gui";

let zetaGui: ZetaGui = null;
const uiDivFull = document.getElementById("zeta-sample-ui-div-full") as HTMLDivElement;
const uiDivMini = document.getElementById("zeta-sample-ui-div-mini") as HTMLDivElement;

async function initZeta() {
    zetaGui = await ZetaGui.init(uiDivFull, {
        zetaUrlPrefix: "https://beta.zetabase.ai",
        pixelRatio: 1.0,
    });

    if (!zetaGui.engine.scene) {
        await zetaGui.loadScene("m5vb8zahjcxf035x");
    }
}

initZeta();

document.getElementById("zeta-sample-ui-switch-button-full").addEventListener("click", () => {
    zetaGui.mountInto(uiDivFull);
});

document.getElementById("zeta-sample-ui-switch-button-mini").addEventListener("click", () => {
    zetaGui.mountInto(uiDivMini);
});
