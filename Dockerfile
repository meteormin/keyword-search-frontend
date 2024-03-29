FROM node:18.12-alpine as build

LABEL maintainer="miniyu97@gmail.com"

RUN mkdir /react

WORKDIR /react

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:stable-alpine AS base

LABEL maintainer="miniyu97@gmail.com"

RUN apk --no-cache add tzdata && \
	cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
	echo "Asia/Seoul" > /etc/timezone \
	apk del tzdata

RUN mkdir -p /var/www/react

FROM base AS deploy

WORKDIR /var/www/react

COPY --from=build /react/build ./build
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/react.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443