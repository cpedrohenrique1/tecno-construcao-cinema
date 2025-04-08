FROM node:22.14-alpine
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 8080
CMD [ "npx", "http-server" ]