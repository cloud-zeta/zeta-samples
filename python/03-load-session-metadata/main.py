import json
import os

from zeta.sdk.db import ZetaSession, ZetaSessionData
from zeta.sdk.engine import ZetaEngine


# The auth token and encryption key can be created in the settings page:
# https://cloudzeta.com/settings/
TOKEN_ID = os.environ.get("ZETA_AUTH_TOKEN_ID")
ENCRYPTION_KEY = os.environ.get("ZETA_ENCRYPTION_KEY")

# https://cloudzeta.com/zeta/ephemerals/session/lyur2tqlvqdjhoep/upload-test-usdc-01/box.usdc
TEST_SESSION_UID = "lyur2tqlvqdjhoep"


def load_session_metadata_by_uid():
    s1 = ZetaSession.get_by_uid(TEST_SESSION_UID)
    d1: ZetaSessionData = s1.data

    # Note that ZetaSessionData is not a JSON serializable object.
    print("session metadata: ", json.dumps({
        "uid": d1.uid,
        "name": d1.name,
        "createdAt": d1.createdAt,
        "updatedAt": d1.updatedAt,
        "deletedAt": d1.deletedAt,

        "projectUid": d1.projectUid,

        # Asset paths
        "rootAssetPath": d1.rootAssetPath,
        "thumbnailAsset": d1.thumbnailAsset,

        # Session access control
        "isPublic": d1.isPublic,
        "isPublished": d1.isPublished,
        "isEphemeral": d1.isEphemeral,
    }, indent=2))


def main():
    engine = ZetaEngine()
    result = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not result:
        print("login failed")
        return

    load_session_metadata_by_uid()


if __name__ == "__main__":
    main()