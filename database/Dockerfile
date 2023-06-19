FROM mysql

ENV MYSQL_ROOT_PASSWORD=Pass123
ENV MYSQL_DATABASE=jakdojade

COPY backup.sql /docker-entrypoint-initdb.d/backup.sql
EXPOSE 3306
