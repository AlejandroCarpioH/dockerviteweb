# Dockerfile

# Etapa de Construcción
FROM node:20 AS build

WORKDIR /home/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



#Etapa produccon nginx

FROM nginx:stable-alpine

COPY --from=build /home/app/dist /usr/share/nginx/html/prueba

COPY /nginx/default.conf /etc/nginx/conf.d

# EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]




# Etapa de Producción
# FROM node:20

# WORKDIR /home/app

# COPY --from=build /home/app/build /app/build
# COPY --from=build /home/app/node_modules /app/node_modules
# COPY . .

# CMD ["npm", "start"]