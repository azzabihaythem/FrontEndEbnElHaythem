FROM node:14.20 AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . /app

WORKDIR /app

EXPOSE 4200 49153

CMD ng serve --host 0.0.0.0 --port 4201


## run project from Dockerfile`
#docker build -t angular-template .
#docker run -p 4201:4201 angular-template
#ng serve --host 0.0.0.0 --port 4201