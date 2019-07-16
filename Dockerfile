FROM nginx:1.17.4

LABEL maintainter="Maxime Wojtczak <maxime.wojtczak@zenika.com>"

ENV PROJECT resume
ENV VERSION 0.1.0

COPY dist /usr/share/nginx/html

EXPOSE 80
