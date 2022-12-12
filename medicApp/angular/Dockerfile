FROM node:14.20 AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . /app

WORKDIR /app

EXPOSE 4200 49153
