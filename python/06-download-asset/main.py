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

    try:
        file_path = engine.download("users/FygPbdvG6GfNpCPbPNhURDMiLsu2/projects/lsmfafhfls2016vy/m6sm9hwg0ek8frkb/__thumbnails/m6sm9jxucq6dx193.jpeg", "/tmp")
        print(f"Downloaded file_path: {file_path}")
    except Exception as e:
        print(f"error: {e}")
        return

if __name__ == "__main__":
    main()
