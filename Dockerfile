FROM node:alpine
WORKDIR '/client'

COPY package.json .
RUN yarn add
COPY . .
CMD ["yarn","start"]
