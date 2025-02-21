import { ZetaGui } from "@cloudzeta/sdk/gui";

let zetaGui: ZetaGui = null;
const uiDiv = document.getElementById("zeta-sample-ui-div") as HTMLDivElement;

async function runZeta() {
    zetaGui = await ZetaGui.init(
        uiDiv,
        {
            zetaUrlPrefix: "https://beta.zetabase.ai",
            pixelRatio: 1.0,
        },
        "put-tokenUid-here",
        "put-encryptionKey-here"
    );

    await zetaGui.loadScene("m5vb8zahjcxf035x");
}

runZeta();
