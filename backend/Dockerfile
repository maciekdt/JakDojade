FROM node

ADD dist /app/dist
ADD node_modules /app/node_modules
ADD config /app/config
ADD migrations /app/migrations

WORKDIR /app/dist

EXPOSE 8000
CMD node index.js ../config/database.config.json