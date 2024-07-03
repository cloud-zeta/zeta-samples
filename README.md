# Cloud Zeta Samples

This is the main repo for [Cloud Zeta](https://cloudzeta.com), a cloud platform for creators to
manage 3D assets, collaborate on projects, and deliver content from anywhere.

> [!TIP]
>
> Please join our [Discord Server](https://discord.gg/kyTzU2rxYN) for questions, feedback, and tech
> support.

## Web SDK Samples

A Typescript SDK that enables developers to embedded 3D content. See [README.md](web/README.md) for
detailed instructions on how to build and integrate.

## Python SDK Samples

First, create your `auth token` in the [user settings page](https://cloudzeta.com/settings).

```bash
python -m venv venv
source venv/bin/activate
pip install cloudzeta-sdk

export ZETA_AUTH_TOKEN_ID="<insert auth toekn ID here...>"
export ZETA_ENCRYPTION_KEY="<insert encryption key here...>"

cd python/01-upload-assets
python main.py
```

## Google Colab Samples

```python
from zeta.sdk.ephemeral import EphemeralStage
from pxr import UsdGeom

s1 = EphemeralStage(api_key="<insert API key here...>")
p1 = UsdGeom.Xform.Define(s1.stage, "/root")
p2 = UsdGeom.Cube.Define(s1.stage, "/root/cube")
s1.preview()
```

You can run the Python SDK directly on Google Colab and preview the result immediately as all the
edits are synced to Cloud Zeta automatically. Available samples and tutorials are:

1. [Hello OpenUSD](./colab/01-hello-openusd.ipynb)
2. Basic OpenUSD (WIP)
3. TBD...

More samples are coming. We also welcome idea suggestions and collaborations on new samples. Join
our [discord](https://discord.gg/kyTzU2rxYN) to chat a chat!

> [!NOTE]
>
> Samples loaded into Cloud Zeta are ephemeral. When previewing those samples, you are accessing
> Cloud Zeta anonymously. Your sample data will be deleted after 24 hours.
>
> If you want to hold on to the assets you created during the tutorials, just create a free-tier
> account [here](https://cloudzeta.com/login).
