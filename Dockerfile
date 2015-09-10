FROM node:0.12-onbuild

RUN bower install
RUN gulp build
