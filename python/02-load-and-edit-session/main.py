import os

from pxr import Gf, Usd, UsdGeom
from zeta.sdk.db import ZetaSession
from zeta.sdk.engine import ZetaEngine
from zeta.sdk.uid import generate_uid


# The auth token and encryption key can be created in the settings page:
# https://cloudzeta.com/settings/
TOKEN_ID = os.environ.get("ZETA_AUTH_TOKEN_ID")
ENCRYPTION_KEY = os.environ.get("ZETA_ENCRYPTION_KEY")

# https://cloudzeta.com/zeta/ephemerals/session/lyur2tqlvqdjhoep/upload-test-usdc-01/box.usdc
TEST_SESSION_UID = "lyur2tqlvqdjhoep"


def main():
    engine = ZetaEngine()
    result = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not result:
        print("login failed")
        return

    s1 = ZetaSession.get_by_uid(TEST_SESSION_UID)
    workspace: str = f"/tmp/{generate_uid()}"
    stage: Usd.Stage = s1.load_stage(workspace)

    # Add a new transform operation
    p2: Usd.Prim = stage.GetPrimAtPath("/BoxAnimated/Geom/node_0/node_1/node_2")
    t2 = UsdGeom.Xformable(p2)
    t2.ClearXformOpOrder()
    translate_op = t2.AddTranslateOp()
    translate_op.Set(Gf.Vec3d(0, 1, 0))

if __name__ == "__main__":
    main()