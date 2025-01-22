import os

from zeta.sdk.asset import ZetaAsset, ZetaUploadResult
from zeta.sdk.engine import ZetaEngine


# The auth token and encryption key can be created in the settings page:
# https://cloudzeta.com/settings/
TOKEN_ID = os.environ.get("ZETA_AUTH_TOKEN_ID")
ENCRYPTION_KEY = os.environ.get("ZETA_ENCRYPTION_KEY")


def upload_usdc_asset(engine: ZetaEngine):
    """
    Upload a ZetaAsset object.

    The asset will be available via the following URL schema:
      https://cloudzeta.com/<owner_name>/<project_name>/asset/main/<asset_path>

    For this particular example:
      https://cloudzeta.com/zeta/ephemerals/asset/main/upload-test-usdc-01/box.usdc

    owner_name:   zeta
    project_name: ephemerals
    asset_path:   upload-test-usdc-01/box.usdc
    """
    asset: ZetaAsset = engine.asset("zeta", "ephemerals", "upload-test-usdc-01/box.usdc")

    with open("./box.usdc", "rb") as file_data:
        # Upload the asset to the given owner_name and project_name. The server will validate:
        #
        #   1. The traget project exists
        #   2. The user has the permission to upload the asset
        #   3. There is no asset with the same name in the project
        #
        result: ZetaUploadResult = asset.upload(file_data)
        print(f"upload result: {result}")

    result: ZetaUploadResult = asset.create_session()
    print(f"create session result: {result}")
    print(f"asset URL: {result.asset_url}")
    print(f"edtior URL: {result.editor_url}")
    print(f"player upload result: {result.player_url}")


def upload_obj_asset(engine: ZetaEngine):
    """
    Example showing uploading an OBJ and its dependencies (MLT and textures).
    """
    def upload_asset(local_path: str) -> ZetaAsset:
        file_basename = os.path.basename(local_path)
        asset = engine.asset("zeta", "ephemerals", f"upload-test-obj-01/{file_basename}")
        with open(local_path, "rb") as file_data:
            result = asset.upload(file_data)
            print(f"upload {local_path} result: {result}")

        return asset

    upload_asset("./slide/slide.mtl")
    upload_asset("./slide/slide_stylized_ao.png")
    upload_asset("./slide/slide_stylized_bc.png")
    upload_asset("./slide/slide_stylized_n.png")
    upload_asset("./slide/slide_stylized_r.png")
    obj_asset = upload_asset("./slide/slide.obj")

    # Explicitly create the session for the obj file.
    result = obj_asset.create_session()

    print(f"create session result: {result}")
    print(f"asset URL: {result.asset_url}")
    print(f"edtior URL: {result.editor_url}")
    print(f"player upload result: {result.player_url}")


def upload_fbx_asset(engine: ZetaEngine):
    """
    Example showing uploading an FBX and its textures dependencies.
    """
    def upload_asset(local_path: str) -> ZetaAsset:
        file_basename = os.path.basename(local_path)
        asset = engine.asset("zeta", "ephemerals", f"upload-test-fbx-01/{file_basename}")
        with open(local_path, "rb") as file_data:
            result = asset.upload(file_data)
            print(f"upload {local_path} result: {result}")

        return asset

    upload_asset("./chair/chair_swan_bc.png")
    upload_asset("./chair/chair_swan_n.png")
    fbx_asset = upload_asset("./chair/chair.fbx")

    # Explicitly create the session for the fbx file.
    result = fbx_asset.create_session()

    print(f"create session result: {result}")
    print(f"asset URL: {result.asset_url}")
    print(f"edtior URL: {result.editor_url}")
    print(f"player upload result: {result.player_url}")


def upload_gltf_asset(engine: ZetaEngine):
    """
    Example showing uploading a GLTF and its textures dependencies.
    """
    def upload_asset(local_path: str) -> ZetaAsset:
        file_basename = os.path.basename(local_path)
        asset = engine.asset("zeta", "ephemerals", f"upload-test-gltf-01/{file_basename}")
        with open(local_path, "rb") as file_data:
            result = asset.upload(file_data)
            print(f"upload {local_path} result: {result}")

        return asset

    upload_asset("./fox/Fox.bin")
    upload_asset("./fox/Texture.png")
    gltf_asset = upload_asset("./fox/Fox.gltf")

    # Explicitly create the session for the gltf file.
    result = gltf_asset.create_session()

    print(f"create session result: {result}")
    print(f"asset URL: {result.asset_url}")
    print(f"edtior URL: {result.editor_url}")
    print(f"player upload result: {result.player_url}")


def get_signed_url(engine: ZetaEngine):
    asset = engine.asset("zeta", "ephemerals", "upload-test-usdc-01/box.usdc")
    result: ZetaUploadResult = asset.get_signed_url(overwrite=False)

    if result.status == ZetaUploadResult.Status.PENDING:
        print(f"get signed url result: {result.signed_url}")
    else:
        print(f"get signed url result: {result.status}, error: {result.error}")


def main():
    engine = ZetaEngine()

    if not TOKEN_ID or not ENCRYPTION_KEY:
        print("missing ZETA_AUTH_TOKEN_ID or ZETA_ENCRYPTION_KEY")
        return

    result = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not result:
        print("login failed")
        return

    # Uncomment the following line to run the different examples.
    # upload_fbx_asset(engine)
    # upload_gltf_asset(engine)
    # upload_obj_asset(engine)
    upload_usdc_asset(engine)
    get_signed_url(engine)

if __name__ == "__main__":
    main()