#!/usr/bin/env bash

if [ ! -z "$WWWUSER" ]; then
    usermod -u $WWWUSER react-user
fi

yarn install

yarn run build

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
