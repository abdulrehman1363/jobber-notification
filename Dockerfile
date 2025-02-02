FROM node:23-alpine3.20 as builder

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
#COPY .npmrc ./
COPY src ./src
COPY tools ./tools

ARG NPM_TOKEN
# Create .npmrc with the token and registry configuration
RUN echo "@abdulrehman1363:registry=https://npm.pkg.github.com/" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN npm install -g npm@latest
RUN npm ci && npm run build

FROM node:23-alpine3.20

RUN apk add --no-cache curl
COPY package.json ./
COPY tsconfig.json ./
ARG NPM_TOKEN
# Create .npmrc with the token and registry configuration
RUN echo "@abdulrehman1363:registry=https://npm.pkg.github.com/" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN npm install -g npm@latest
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4001

CMD ["npm", "run", "start"]
