FROM postgres:latest

ENV POSTGRES_DB=db
ENV POSTGRES_USER=elhazin
ENV POSTGRES_PASSWORD=123321

COPY init.sql /docker-entrypoint-initdb.d/
