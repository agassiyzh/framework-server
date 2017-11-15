FROM node:alpine

LABEL maintainer="Zhuohui <shupian@2dfire.com>"

ARG TZ='Asia/Shanghai'

ENV TZ $TZ

ENV IOS_FRAMEWORK_SERVER_GIT_URL https://github.com/agassiyzh/framework-server.git


RUN apk upgrade --update \
  && apk add git python sqlite make build-base autoconf automake \
  && git clone $IOS_FRAMEWORK_SERVER_GIT_URL \
  && cd framework-server \
  && npm install

ADD  entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
