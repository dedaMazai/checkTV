FROM node:18.17.0

ARG API_URL
ARG WS_URL
ARG PORT

ENV PORT=$PORT
ENV API_URL=$API_URL
ENV WS_URL=$WS_URL

WORKDIR /app
EXPOSE $PORT

COPY package-lock.json .
COPY package.json .

RUN npm config set strict-ssl false
RUN npm install && npm install -g serve

COPY . .

RUN npm run build
COPY ./serve.json ./build/serve.json

CMD [ "serve", "./build"]
