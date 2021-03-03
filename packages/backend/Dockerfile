# This dockerfile builds an image for the backend package.
# It should be executed with the root of the repo as docker context.
#
# Before building this image, be sure to have run the following commands in the repo root:
#
# yarn install
# yarn tsc
# yarn build
#
# Once the commands have been run, you can build the image using `yarn build-image`

FROM node:14-buster

WORKDIR /app

# Copy repo skeleton first, to avoid unnecessary docker cache invalidation.
# The skeleton contains the package.json of each package in the monorepo,
# and along with yarn.lock and the root package.json, that's enough to run yarn install.
ADD yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./

RUN cd /tmp && curl -O https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tar.xz && \
    tar -xvf Python-3.8.2.tar.xz && \
    cd Python-3.8.2 && \
    ./configure --enable-optimizations && \
    make -j 4 && \
    make altinstall

RUN apt update
RUN apt install -y mkdocs

RUN pip3.8 install mkdocs-techdocs-core

RUN pip3.8 install cookiecutter && \
    apt remove -y build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev libbz2-dev g++ python-pip python-dev && \
    rm -rf /var/cache/apt/* /tmp/Python-3.8.2

RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"
# Then copy the rest of the backend bundle, along with any other files we might want.
ADD packages/backend/dist/bundle.tar.gz app-config.yaml ./

RUN chown 1000:1000 -R /app
USER 1000

CMD ["node", "packages/backend", "--config", "app-config.yaml"]
