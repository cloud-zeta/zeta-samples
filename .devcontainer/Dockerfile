FROM ubuntu:22.04

RUN echo "## Install Basic APT packages"

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        git \
        git-lfs \
        python-is-python3 \
        python3 \
        python3-pip \
        python3-venv \
        tree \
    && echo "## Done"

RUN echo "## Install Latest Node/NPM"

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && echo "## Done"

# Setup timezone
RUN ln -sf /usr/share/zoneinfo/hostlocaltime /etc/localtime

# Setup dev user
ARG USERNAME=dev
ARG UID=1000
RUN groupadd --gid $UID $USERNAME \
    && useradd --uid $UID --gid $UID --shell /bin/bash -m $USERNAME \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

RUN mkdir /zeta
RUN chown ${USERNAME}:${USERNAME} /zeta

# Switch to dev user
USER ${USERNAME}