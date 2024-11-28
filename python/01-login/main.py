import os

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

    result = engine.login(TOKEN_ID, ENCRYPTION_KEY)
    if not result:
        print("login failed")
        return
    print("login success")


if __name__ == "__main__":
    main()