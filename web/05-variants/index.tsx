import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';


import { ZetaEngineBeta, ZetaEngineInit } from "@cloudzeta/sdk/core";
import { UsdPrim, UsdStage, UsdVariantSet, UsdVariantSets } from "@cloudzeta/wasm";

const UsdVariantsDemo: React.FC = () => {
    const [variantSet, setVariantSet] = React.useState<UsdVariantSet>(null);
    const [variantNames, setVariantNames] = React.useState<string[]>([]);

    const loadFirstVariantSetFromDefaultPrim = async (stage: UsdStage): Promise<void> => {
        const hasDefaultPrim = await stage.HasDefaultPrim();
        if (!hasDefaultPrim) {
            console.error("Stage has no default prim");
            return;
        }

        const defaultPrim: UsdPrim = await stage.GetDefaultPrim();

        if (!defaultPrim.IsValid()) {
            console.error("Default prim is not valid");
            return;
        }

        const variantSets: UsdVariantSets = defaultPrim.GetVariantSets();

        // Iterate through all variant sets and get their names
        const variantSetNames: string[] = [];
        const names = variantSets.GetNames();
        for (let i: number = 0; i < names.size(); i++) {
            variantSetNames.push(names.get(i));
        }

        if (variantSetNames.length === 0) {
            console.error("No variant sets found");
            return;
        }

        // In this sample, we only use the first variant set.
        const variantSet: UsdVariantSet = variantSets.GetVariantSet(variantSetNames[0]);

        const variantNames = variantSet.GetVariantNames();
        const variantNamesStr: string[] = [];
        for (let i: number = 0; i < variantNames.size(); i++) {
            variantNamesStr.push(variantNames.get(i));
        }

        setVariantSet(variantSet);
        setVariantNames(variantNamesStr);
    }

    React.useEffect(() => {
        const initializeEngine = async () => {
            const canvasId = "zeta-sample-canvas";

            const engine: ZetaEngineBeta = await ZetaEngineInit({
                canvasId: canvasId,
                pixelRatio: 1.0,
                zetaUrlPrefix: "https://beta.zetabase.ai",
            }) as ZetaEngineBeta;

            console.log("Engine created successfully");

            engine.onSceneLoaded(async () => {
                console.log("Scene loaded successfully");

                loadFirstVariantSetFromDefaultPrim(engine.scene.GetStage());
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
                {
                    variantSet !== null &&
                    variantSet.GetName()
                }
                </MenuButton>

                <MenuItems>
                {
                    variantNames.map((name: string) => (
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
