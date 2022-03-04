FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN cd /app \
    && yarn install --pure-lockfile

COPY . /app
CMD ["yarn", "dev"]