FROM ubuntu:22.04

LABEL maintainer="miniyu97@gmail.com"

CMD ["/bin/bash"]

ARG WWWGROUP
ARG WWWUSER

RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

RUN apt -y upgrade \
    && apt update \
    && apt install -y supervisor \
    && apt install -y curl \
    && apt install -y wget \
    && apt install -y vim \
    && apt install -y nginx

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt -qq install nodejs --yes

RUN groupadd --force -g $WWWGROUP react-user
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 react-user

RUN npm install -g yarn

RUN mkdir -p /var/www/front
WORKDIR /var/www/front

COPY supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/react.conf /etc/nginx/conf.d
COPY start-container.sh /usr/local/bin/start-container

RUN chown -R react-user:$WWWGROUP /var/www/front
RUN chgrp -R $WWWGROUP /var/www/front
RUN chmod +x /usr/local/bin/start-container

EXPOSE 80
EXPOSE 443

CMD ["start-container"]