FROM node:18-alpine3.20 as build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# ---
FROM nginx:1.27.0-alpine
WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# add env.sh to docker-entrypoint.d
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
