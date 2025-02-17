import os

from zeta.sdk.db import ZetaSession
from zeta.sdk.engine import ZetaEngine


# The auth token and encryption key can be created in the settings page:
# https://cloudzeta.com/settings/
TOKEN_ID = os.environ.get("ZETA_AUTH_TOKEN_ID")
ENCRYPTION_KEY = os.environ.get("ZETA_ENCRYPTION_KEY")

# https://zetabase.ai/zeta/public-demo/session/lt3k51km833tfl3d/zeta-logo.usd
TEST_SESSION_UID = "lt3k51km833tfl3d"


def main():
    engine = ZetaEngine()
    result = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not result:
        print("login failed")
        return

    s1 = ZetaSession.get_by_uid(TEST_SESSION_UID)
    usdz_path = s1.export_usdz("/tmp")

    print(f"Exported USDZ to: {usdz_path}")


if __name__ == "__main__":
    main()