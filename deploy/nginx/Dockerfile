FROM nginx:1.23.3

COPY ./deploy/nginx/default /etc/nginx/sites-enabled/default
COPY ./deploy/nginx/webmet.ohmc.ar /etc/nginx/sites-enabled/webmet.ohmc.ar
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./static /var/www/html/static

RUN rm -rf /etc/nginx/conf.d
