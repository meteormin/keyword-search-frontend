FROM ubuntu/apache2:2.4-20.04_beta
MAINTAINER "sm.yoo@testworks.co.kr"

CMD ["bash"]

RUN sed -i "s/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=root/" /etc/apache2/envvars
RUN sed -i "s/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_USER=root/" /etc/apache2/envvars

RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod ssl
RUN a2enmod rewrite

EXPOSE 80
EXPOSE 443

CMD ["apache2-foreground"]