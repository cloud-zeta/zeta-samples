import { ZetaGui } from "@cloudzeta/sdk/gui";

let zetaGui: ZetaGui = null;
const uiDivFull = document.getElementById("zeta-sample-ui-div-full") as HTMLDivElement;
const uiDivMini = document.getElementById("zeta-sample-ui-div-mini") as HTMLDivElement;

async function runZeta(root: HTMLDivElement) {
    zetaGui = await ZetaGui.init(root, {
        zetaUrlPrefix: "https://beta.zetabase.ai",
    });

    if (!zetaGui.engine) {
        throw new Error("Failed to initialize Zeta engine");
    }

    if (!zetaGui.engine.scene) {
        zetaGui.engine.loadScene("m5vb8zahjcxf035x");
    }

    zetaGui.mountInto(root);
}

document.getElementById("zeta-sample-ui-switch-button-full").addEventListener("click", () => {
    runZeta(uiDivFull);
});

document.getElementById("zeta-sample-ui-switch-button-mini").addEventListener("click", () => {
    runZeta(uiDivMini);
});
