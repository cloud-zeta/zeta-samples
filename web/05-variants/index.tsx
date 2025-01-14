import { createRoot } from 'react-dom/client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import * as React from 'react';


import { ZetaEngineBeta, ZetaEngineInit } from "@cloudzeta/engine";
import { UsdVariantSet, UsdVariantSets } from "@cloudzeta/wasm";

const UsdVariantsDemo: React.FC = () => {
    const [variantSetNames, setVariantSetNames] = React.useState<string[]>([]);
    const [variantSet, setVariantSet] = React.useState<UsdVariantSet>(null);

    React.useEffect(() => {
        const initializeEngine = async () => {
            const canvasId = "zeta-sample-canvas";

            const engine: ZetaEngineBeta = await ZetaEngineInit({
                canvasId: canvasId,
                pixelRatio: 1.0,
                zetaUrlPrefix: "https://beta.zetabase.ai"
            }) as ZetaEngineBeta;

            console.log("Engine created successfully");

            engine.onSceneLoaded(() => {
                console.log("Scene loaded successfully");

                const prim = engine.scene.GetStage()?.GetPrimAtPath("/vehicleVariant");
                if (!prim) {
                    console.error("Root prim not found");
                    return;
                }

                const variantSets: UsdVariantSets = prim.GetVariantSets();
                const variantSet: UsdVariantSet = variantSets.GetVariantSet("wheels");

                const variantSetNames: string[] = [];
                const names = variantSet.GetVariantNames();
                for (let i: number = 0; i < names.size(); i++) {
                    variantSetNames.push(names.get(i));
                }

                console.log("variantSetNames: ", variantSetNames);

                setVariantSet(variantSet);
                setVariantSetNames(variantSetNames);
            });

            // Load a scene from Cloud Zeta, the same scene can be viewed at:
            // https://beta.zetabase.ai/player/m5vnjz11l02vzjxf
            engine.loadScene("m5vnjz11l02vzjxf");
        };

        initializeEngine();
    }, []);

    return (
        <div style={{ position: "absolute", top: 16, left: 16 }}>
            <Menu as="div">
                <MenuButton>
                    Variants
                </MenuButton>

                <MenuItems>
                {
                    variantSetNames.map((name: string) => (
                        <MenuItem key={name}>
                            <button onClick={ () => variantSet.SetVariantSelection(name) } >
                                {name}
                            </button>
                        </MenuItem>
                    ))
                }
                </MenuItems>
            </Menu>
        </div>
    );
}

const root = createRoot(document.getElementById("zeta-sample-ui-root")!);
root.render(<UsdVariantsDemo />);
