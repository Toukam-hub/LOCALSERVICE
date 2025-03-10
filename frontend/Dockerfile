# Étape 1 : Build Angular (facultatif si tu fais ng build manuellement)
FROM node:20.17.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.23
COPY --from=build /app/dist/* /usr/share/nginx/html

# Exposer le port 80 pour accéder à l’application
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
