#!/usr/bin/env bash

if [ ! -z "$WWWUSER" ]; then
    usermod -u $WWWUSER react-user
fi

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
