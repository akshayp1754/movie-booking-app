FROM node:18-alpine
WORKDIR /Docker-Compose-Example/backend/

COPY . /Docker-Compose-Example/backend/

EXPOSE 8080

RUN npm install

RUN npm run build

CMD [ "node","dist/bundle.js","preview" ]