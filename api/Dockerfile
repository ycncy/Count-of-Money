# Étape de construction
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape de production
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
RUN npm install 

COPY --from=build /usr/src/app/dist ./dist

# Exposer le port sur lequel votre app s'exécute
EXPOSE 5000

CMD ["node", "dist/main"]
