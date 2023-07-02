FROM node:18 as build

COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

COPY . /app/
RUN npm run build && \
    rm -rf node_modules && \
    npm install --production

#FROM gcr.io/distroless/nodejs18-debian11
FROM node:18-bullseye
WORKDIR /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/src /app/src
COPY --from=build /app/start.js /app/package.json /app/package-lock.json /app/
CMD ["node", "/app/start.js"]
