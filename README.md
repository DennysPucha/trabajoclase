
# API REST

El api tiene una serie de endpoints de para la autentifación como usuarios, credenciales y roles



## Deployment

El dockerfile de la apliacion es la siguiente:

```bash
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm","run", "dev"]
```

El dockercompose de la aplicación en conjunto con la bd mysql es el siguiente:

```bash
version: '3.8'

services:
  bd_mysql:
    container_name: bd_mysql
    image: mysql:latest
    ports:
      - "8000:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 123456789
      MYSQL_DATABASE: prisma
    networks:
      - redapi

  api:
    container_name: apirun
    image: api
    ports:
      - "8001:3000"
    networks:
      - redapi

networks:
  redapi:
    name: redapi
    driver: bridge
```
