
FROM node:latest
WORKDIR /app
COPY *.json .
RUN npm ci
COPY /src ./src
EXPOSE 5000
CMD ["npm", "run", "start"]