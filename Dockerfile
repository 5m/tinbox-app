FROM node:4.1.0-onbuild

ENV STATIC_BASE /srv/app
RUN mkdir -p $STATIC_BASE

RUN node_modules/.bin/bower --allow-root install
COPY src/config-docker.json src/config.json
RUN npm run build

EXPOSE 5000
# CMD is inherited from parent, it's ["npm", "start"]
