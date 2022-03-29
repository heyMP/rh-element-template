FROM node:16-alpine as base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# FROM socialengine/nginx-spa as prod
# WORKDIR /app
# COPY --from=base /app/dist /app