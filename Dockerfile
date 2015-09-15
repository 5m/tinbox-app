FROM node:0.12-onbuild

ENV STATIC_BASE /srv/app
RUN mkdir -p $STATIC_BASE

RUN node_modules/.bin/bower --allow-root install
RUN node_modules/.bin/gulp build

VOLUME $STATIC_BASE
