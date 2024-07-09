import os

from zeta.sdk.asset import ZetaAsset, ZetaUploadResult
from zeta.sdk.engine import ZetaEngine


# The auth token and encryption key can be created in the settings page:
# https://cloudzeta.com/settings/
TOKEN_ID = os.environ.get("ZETA_AUTH_TOKEN_ID")
ENCRYPTION_KEY = os.environ.get("ZETA_ENCRYPTION_KEY")

def main():
    engine = ZetaEngine()

    if not TOKEN_ID or not ENCRYPTION_KEY:
        print("missing ZETA_AUTH_TOKEN_ID or ZETA_ENCRYPTION_KEY")
        return

    res = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not res:
        print("login failed")
        return

    #
    # Create a ZetaAsset object.
    #
    # The asset will be available via the following URL schema:
    #   https://cloudzeta.com/<owner_name>/<project_name>/asset/main/<asset_path>
    #
    # For this particular example:
    #   https://cloudzeta.com/zeta/ephemerals/asset/main/upload-test-01/box.usdc
    #
    # owner_name:   zeta
    # project_name: ephemerals
    # asset_path:   upload-test-01/box.usdc
    #
    asset: ZetaAsset = engine.asset("zeta", "ephemerals", "upload-test-01/box-18.usdc")

    with open("./box.usdc", "rb") as file_data:
        # Upload the asset to the given owner_name and project_name. The server will validate:
        #
        #   1. The traget project exists
        #   2. The user has the permission to upload the asset
        #   3. There is no asset with the same name in the project
        #
        result: ZetaUploadResult = asset.upload(file_data)
        print(f"upload result: {result}")


if __name__ == "__main__":
    main()