# Api building: ~483.85 MB ---------------------------------
FROM node:19-alpine3.16 AS build-api
WORKDIR /usr/api
COPY ./backend/package*.json ./
RUN npm ci
COPY ./backend .
RUN npm run build

# Angular building: ~675.16 MB ------------------------------
FROM node:19-alpine3.16 AS build-frontend
WORKDIR /usr/frontend
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend .
RUN  node_modules/.bin/ng build

# Production: ~283.6 MB -------------------------------------
FROM alpine:3.17.1 AS production
RUN apk add --update nodejs npm
WORKDIR /usr/app
COPY --from=build-api /usr/api/dist ./dist
COPY --from=build-api /usr/api/node_modules ./node_modules
COPY --from=build-frontend /usr/frontend/dist ./client
RUN mkdir /media/hot
RUN mkdir /media/cold
CMD ["node", "dist/main.js"]