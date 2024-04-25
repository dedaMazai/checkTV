FROM registry.svo.aero/dpm/airport_digital_ecosystem/aodb/infra:base-node-18

ARG API_SERVER
ENV API_SERVER=$API_SERVER

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm config set strict-ssl false

COPY . .
