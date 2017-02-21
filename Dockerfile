FROM     ubuntu:14.04.4

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_VERSION=6.9.1 \
    SUPERACAO=/server-notification

# Install basics
RUN apt-get update &&  \
    apt-get install -y git wget curl unzip ruby && \

    curl --retry 3 -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
    npm install -g npm && \
    npm cache clear && \

#Copy all files and folders of Superacao
COPY . ${SUPERACAO}
RUN cd ${SUPERACAO} && npm install

WORKDIR ${SUPERACAO}
EXPOSE 8080
