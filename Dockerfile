# Build:
# docker build -t ksuayan/site .
#
# Run:
# docker run -it ksuayan/site
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER Kyo Suayan

# 80 = HTTP, 443 = HTTPS, 9000 = site server, 35729 = livereload, 8080 = node-inspector
EXPOSE 80 443 9000 35729 8080

# Set development environment as default
ENV NODE_ENV development

# Insert secrets here.
# --------------------------------------------
ENV FB_CLIENT_ID ""
ENV FB_SECRET ""
ENV GOOGLE_CLIENT_ID ""
ENV GOOGLE_CLIENT_SECRET ""
ENV LINKEDIN_CONSUMER_KEY ""
ENV LINKEDIN_CONSUMER_SECRET ""
ENV TWITTER_CONSUMER_KEY ""
ENV TWITTER_CONSUMER_SECRET ""
ENV TWITTER_ACCESS_TOKEN ""
ENV TWITTER_ACCESS_SECRET ""
ENV VIMEO_CLIENT_ID ""
ENV VIMEO_CLIENT_SECRET ""
ENV VIMEO_ACCESS_TOKEN ""
ENV FLICKR_KEY ""
ENV FLICKR_SECRET ""
ENV FLICKR_USER_ID ""
ENV FLICKR_ACCESS_TOKEN ""
ENV FLICKR_ACCESS_TOKEN_SECRET ""
ENV INSTAGRAM_CLIENT_ID ""
ENV INSTAGRAM_CLIENT_SECRET ""
# --------------------------------------------

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install site Prerequisites
RUN npm install --quiet -g grunt bower && npm cache clean

RUN mkdir -p /opt/site/public
WORKDIR /opt/site

COPY ./handlebars /opt/site/handlebars
COPY ./public /opt/site/public
COPY ./views /opt/site/views
COPY ./server /opt/site/server

# Install bower packages
COPY bower.json /opt/site/bower.json
RUN bower install --quiet --allow-root --config.interactive=false

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Install npm packages
COPY package.json /opt/site/package.json
COPY package-lock.json /opt/site/package-lock.json
RUN npm install --quiet && npm cache clean

COPY Gruntfile.js /opt/site/Gruntfile.js
RUN grunt

# Run site server
CMD npm install && npm start
