FROM ubuntu/apache2:2.4-20.04_beta
MAINTAINER "miniyu97@gmail.com"

CMD ["/bin/bash"]

RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod ssl
RUN a2enmod rewrite
RUN apt update
RUN apt install -y curl vim \
    && apt-get -y autoclean \
RUN mkdir /var/www/front
WORKDIR /var/www/front

EXPOSE 80
EXPOSE 443

CMD ["apache2-foreground"]