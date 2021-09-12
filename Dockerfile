FROM node:14.17.6-alpine

WORKDIR /workspace

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD ["yarn", "start"]