#!/bin/sh
envsubst '$BACKEND_HOST $BACKEND_PORT' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf
exec nginx -g 'daemon off;'