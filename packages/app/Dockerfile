FROM nginx:mainline

RUN apt-get update && apt-get -y install jq && rm -rf /var/lib/apt/lists/*
COPY packages/app/dist /usr/share/nginx/html

RUN useradd -u 5000 app \
 && mkdir -p /var/run/nginx /var/tmp/nginx \
 && chown -R 5000:5000 /usr/share/nginx /var/run/nginx /var/cache/nginx /var/tmp/nginx /etc/nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker/run.sh /usr/local/bin/run.sh
CMD run.sh

USER 5000:5000

ENV PORT 8080