FROM node:lts-alpine as build-npm-stage

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . ./

RUN npm run build

# Run env
FROM nginx:stable-alpine
COPY --from=build-npm-stage /client/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]